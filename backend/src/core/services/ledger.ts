import { IRepository, Repository } from '../dal';
import { Ledger as Model } from '../models';
import { Ledger as Presentation } from '../../models-folder';
import { Budget } from './budget';
import { ForbiddenError } from '../../routes/errors/forbiddenError';
import { Ledger as ReadOnlyPresentation } from '../../models-folder/presentations/readonly';
import { isNullOrUndefined } from 'util';
import { ArrayTree } from './dataStructures';
import { Ledger as ModificationPresentation } from '../../models-folder/presentations/modification';
import { Estimate } from './estimate';
import { ConflictError } from '../../routes/errors';

export class Ledger {
  private repo: IRepository<Model>;
  private budget: Budget;
  private estimate: Estimate;

  public constructor(
    repo?: IRepository<Model>,
    budget?: Budget,
    estimate?: Estimate
  ) {
    this.repo = repo || new Repository<Model>(Model.tableName);
    this.budget = budget || new Budget();
    this.estimate = estimate || new Estimate();
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

  public async childLedgers(
    budgetID: number,
    userID: number
  ): Promise<ReadOnlyPresentation[]> {
    const ledgers = await this.getLedgersForBudget(budgetID, userID);
    const results: ReadOnlyPresentation[] = [];
    const parentLedgerIDs = ledgers.map(ledger => ledger.parentLedgerID);

    for (const ledger of ledgers) {
      if (!parentLedgerIDs.includes(ledger.id)) {
        results.push(ledger);
      }
    }

    return results;
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

  public async deleteLedger(ledgerID: number, userID: number): Promise<void> {
    const model = await this.repo.find(ledgerID);
    await this.throwIfLedgerDoesNotBelongToUser(model, userID);

    const hasEstimates = await this.estimate.ledgerHasEstimates(ledgerID);
    if (hasEstimates) {
      throw new ConflictError(
        'The ledger has estimates in them. In order to delete it, you must first delete the estimates.'
      );
    } else {
      await this.repo.delete(ledgerID);
    }
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
      ledger.id,
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
