import { IRepository, Repository } from '../dal';
import { default as Model } from '../models/budget';

export class Budget {
  private repo: IRepository<Model>;

  public constructor(repo?: IRepository<Model>) {
    this.repo = repo || new Repository<Model>(Model.tableName);
  }

  public async budgetsFromUser(userID: number): Promise<Model[]> {
    const budgets = await this.repo.get({ userID });
    return budgets;
  }
}
