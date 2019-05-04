import { IRepository, Repository } from '../dal';
import { Budget, Ledger, Estimate } from '../models';
import { ForbiddenError } from '../../routes/errors';

export class Security {
  private budgetRepo: IRepository<Budget>;
  private ledgerRepo: IRepository<Ledger>;
  private estimateRepo: IRepository<Estimate>;

  public constructor(
    budgetRepo?: IRepository<Budget>,
    ledgerRepo?: IRepository<Ledger>,
    estimateRepo?: IRepository<Estimate>
  ) {
    this.budgetRepo = budgetRepo || new Repository(Budget.tableName);
    this.ledgerRepo = ledgerRepo || new Repository(Ledger.tableName);
    this.estimateRepo = estimateRepo || new Repository(Estimate.tableName);
  }

  public async throwIfBudgetDoesNotBelongToUser(
    budgetID: number,
    userID: number
  ) {
    const budgets = await this.budgetsFromUser(userID);

    let found = false;
    for (const budget of budgets) {
      if (budget.id === budgetID) {
        found = true;
        break;
      }
    }

    if (!found) {
      throw new ForbiddenError();
    }
  }

  public async throwIfLedgerDoesNotBelongToUser(
    ledger: Ledger,
    userID: number
  ) {
    const budgets = await this.budgetsFromUser(userID);
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

  private async budgetsFromUser(userID: number): Promise<Budget[]> {
    return this.budgetRepo.get({ userID });
  }
}
