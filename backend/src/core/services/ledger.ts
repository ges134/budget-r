import { IRepository, Repository } from '../dal';
import { Ledger as Model } from '../models';
import { Ledger as Presentation } from '../../models-folder';
import { Budget } from './budget';
import { ForbiddenError } from '../../routes/errors/forbiddenError';
import { Ledger as ReadOnlyPresentation } from '../../models-folder/presentations/readonly';
import { isNullOrUndefined } from 'util';
import { ArrayTree } from './dataStructures';
import { Ledger as ModificationPresentation } from '../../models-folder/presentations/modification';

export class Ledger {
  private repo: IRepository<Model>;
  private budget: Budget;

  public constructor(repo?: IRepository<Model>, budget?: Budget) {
    this.repo = repo || new Repository<Model>(Model.tableName);
    this.budget = budget || new Budget();
  }

  public async addLedger(
    presentation: Presentation,
    userID: number
  ): Promise<number> {
    await this.throwIfBudgetDoesNotBelongToUser(presentation.budgetID, userID);

    const { name, budgetID, parentLedgerID } = presentation;
    const model = new Model(name, budgetID, parentLedgerID);
    const id = await this.repo.add(model);
    return id;
  }

  public async getLedgersForBudget(
    budgetID: number,
    userID: number
  ): Promise<ReadOnlyPresentation[]> {
    await this.throwIfBudgetDoesNotBelongToUser(budgetID, userID);

    const ledgers = await this.repo.get({ budgetID });
    const orderedList = this.orderedLedgers(ledgers);
    const result = orderedList.map(ledger =>
      this.addDepthToLedger(ledger, orderedList)
    );
    return result;
  }

  public async editLedger(
    ledger: ModificationPresentation,
    userID: number
  ): Promise<void> {
    const model = await this.repo.find(ledger.id);
    await this.throwIfLedgerDoesNotBelongToUser(model, userID);
    model.name = ledger.name;
    model.parentLedgerID = ledger.parentLedgerID;
    await this.repo.update(model);
  }

  private orderedLedgers(ledgers: Model[]): Model[] {
    const parentless = ledgers.filter(
      ledger =>
        isNullOrUndefined(ledger.parentLedgerID) || ledger.parentLedgerID === 0
    );
    const withParent = ledgers.filter(ledger => !parentless.includes(ledger));
    const tree = new ArrayTree<number, Model>();
    for (const root of parentless) {
      tree.add(root.id, root);
    }
    this.bindLedgersToParents(tree, withParent);
    return tree.toArray();
  }

  private bindLedgersToParents(
    roots: ArrayTree<number, Model>,
    ledgers: Model[]
  ) {
    const filtered = ledgers.filter(ledger =>
      roots.includes(ledger.parentLedgerID)
    );

    const rest = ledgers.filter(ledger => !filtered.includes(ledger));

    for (const ledger of filtered) {
      roots.add(ledger.id, ledger, ledger.parentLedgerID);
    }

    if (rest.length) {
      this.bindLedgersToParents(roots, rest);
    }
  }

  private addDepthToLedger(
    ledger: Model,
    ledgers: Model[]
  ): ReadOnlyPresentation {
    let current = ledger;
    let depth = 1;
    while (current.parentLedgerID) {
      depth++;
      current = ledgers.filter(l => l.id === current.parentLedgerID)[0];
    }

    return new ReadOnlyPresentation(
      ledger.name,
      ledger.budgetID,
      depth,
      ledger.parentLedgerID
    );
  }

  private async throwIfBudgetDoesNotBelongToUser(
    budgetID: number,
    userID: number
  ) {
    const belongs = await this.budget.budgetBelongsToUser(budgetID, userID);
    if (!belongs) {
      throw new ForbiddenError();
    }
  }

  private async throwIfLedgerDoesNotBelongToUser(
    ledger: Model,
    userID: number
  ) {
    const budgets = await this.budget.budgetsFromUser(userID);
    let found = false;
    for (const budget of budgets) {
      if (ledger.budgetID === budget.id) {
        found = true;
        break;
      }
    }

    if (!found) {
      throw new ForbiddenError();
    }
  }
}
