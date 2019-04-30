import { IRepository, Repository } from '../dal';
import { Ledger as Model } from '../models';
import { Ledger as Presentation } from '../../models-folder';
import { Budget } from './budget';
import { ForbiddenError } from '../../routes/errors/forbiddenError';
import { Ledger as ReadOnlyPresentation } from '../../models-folder/presentations/readonly';
import { isNullOrUndefined } from 'util';
import { ArrayTree } from './dataStructures';

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
    const budgetsBelongToUser = await this.budget.budgetBelongsToUser(
      presentation.budgetID,
      userID
    );

    if (budgetsBelongToUser) {
      const { name, budgetID, parentLedgerID } = presentation;
      const model = new Model(name, budgetID, parentLedgerID);
      const id = await this.repo.add(model);
      return id;
    } else {
      throw new ForbiddenError();
    }
  }

  public async getLedgersForBudget(
    budgetID: number,
    userID: number
  ): Promise<ReadOnlyPresentation> {
    const budgetBelongsToUser = await this.budget.budgetBelongsToUser(
      budgetID,
      userID
    );

    if (budgetBelongsToUser) {
      const ledgers = await this.repo.get({ userID });
      const orderedList = this.orderedLedgers(ledgers);
      const result = orderedList.map(ledger =>
        this.addDepthToLedger(ledger, orderedList)
      );
      return result;
    } else {
      throw new ForbiddenError();
    }
  }

  private orderedLedgers(ledgers: Model[]): Model[] {
    const parentless = ledgers.filter(ledger =>
      isNullOrUndefined(ledger.parentLedgerID)
    );
    const withParent = ledgers.filter(ledger => !parentless.includes(ledger));
    const tree = new ArrayTree<number, Model>();
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

    if (rest) {
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
      current = ledgers.filter(
        ledger => ledger.id === current.parentLedgerID
      )[0];
    }

    return new ReadOnlyPresentation(
      ledger.name,
      ledger.budgetID,
      depth,
      ledger.parentLedgerID
    );
  }
}
