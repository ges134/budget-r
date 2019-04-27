import { IRepository, Repository } from '../dal';
import { Budget as Model } from '../models/budget';
import { Budget as Presentation } from '../../models-folder';

export class Budget {
  private repo: IRepository<Model>;

  public constructor(repo?: IRepository<Model>) {
    this.repo = repo || new Repository<Model>(Model.tableName);
  }

  public async budgetsFromUser(userID: number): Promise<Model[]> {
    const budgets = await this.repo.get({ userID });
    return budgets;
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
}
