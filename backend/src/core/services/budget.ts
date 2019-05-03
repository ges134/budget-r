import { IRepository, Repository } from '../dal';
import { Budget as Model } from '../models/budget';
import { Budget as Presentation } from '../../models-folder';
import { Budget as Readonly } from '../../models-folder/presentations/readonly';
import { IStep } from '../../models-folder/presentations/commons';
import { Ledger } from './ledger';
import { Estimate } from './estimate';
import { Factory } from './factory';

export const maxStepsForBudgetCreation = 3;

export class Budget {
  private repo: IRepository<Model>;
  private ledgerService: Ledger;
  private estimateService: Estimate;

  public constructor(
    repo?: IRepository<Model>,
    ledgerService?: Ledger,
    estimateService?: Estimate
  ) {
    const serviceFactory = Factory.getInstance();
    this.repo = repo || new Repository<Model>(Model.tableName);
    this.ledgerService = ledgerService || serviceFactory.ledger();
    this.estimateService = estimateService || serviceFactory.estimate();
  }

  public async budgetsFromUser(userID: number): Promise<Model[]> {
    const budgets = await this.repo.get({ userID });
    return budgets;
  }

  public async budgetPresentationsFromUser(
    userID: number
  ): Promise<Readonly[]> {
    const budgets = await this.budgetsFromUser(userID);
    const presentations: Readonly[] = [];

    for (const budget of budgets) {
      const steps = await this.budgetCompletion(budget, userID);
      const { id, startDate, name, description } = budget;
      const startMonth = startDate.getMonth();
      const startYear = startDate.getFullYear();
      presentations.push(
        new Readonly(id, startMonth, startYear, name, description, steps)
      );
    }

    return presentations;
  }

  public async addBudget(
    presentation: Presentation,
    userID: number
  ): Promise<number> {
    const { startMonth, startYear, name, description } = presentation;

    const startDate = new Date();
    const monthAsNumber = Presentation.months.indexOf(startMonth);
    startDate.setMonth(monthAsNumber);
    startDate.setDate(1);
    startDate.setFullYear(startYear);

    const model = new Model(startDate, userID, name, description);
    const id = await this.repo.add(model);
    return id;
  }

  public async budgetBelongsToUser(
    budgetID: number,
    userID: number
  ): Promise<boolean> {
    const budgets = await this.budgetsFromUser(userID);

    for (const budget of budgets) {
      if (budget.id === budgetID) {
        return true;
      }
    }

    return false;
  }

  private async budgetCompletion(
    budget: Model,
    userID: number
  ): Promise<IStep> {
    let step = 1;

    const ledgers = await this.ledgerService.childLedgers(budget.id, userID);

    if (ledgers.length > 0) {
      step++;
      const hasEstimates = await this.estimateService.allLedgerHasEstimates(
        ledgers.map(ledger => ledger.id)
      );

      if (hasEstimates) {
        step++;
      }
    }

    return {
      step,
      outOf: maxStepsForBudgetCreation
    };
  }
}
