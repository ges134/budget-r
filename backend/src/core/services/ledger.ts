import { IRepository, Repository } from '../dal';
import { Ledger as Model } from '../models';
import { Ledger as Presentation } from '../../models-folder';
import { Budget } from './budget';
import { ForbiddenError } from 'src/routes/errors/forbiddenError';

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
    const budgetsBelongToUser = this.budget.budgetBelongsToUser(
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
}
