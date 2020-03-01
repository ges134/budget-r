import { IRepository, Repository } from '../dal';
import { Account as Model } from '../models';
import { Account as Presentation } from '../../models-folder/presentations/creation';

export class Account {
  private repo: IRepository<Model>;

  public constructor(repo?: IRepository<Model>) {
    this.repo = repo || new Repository<Model>(Model.tableName);
  }

  public async addAccount(
    presentation: Presentation,
    userID: number
  ): Promise<number> {
    const { initialAmount, accountName } = presentation;
    const model = new Model(initialAmount, accountName, userID);

    const id = await this.repo.add(model);
    return id;
  }
}
