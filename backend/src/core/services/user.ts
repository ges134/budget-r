import { IRepository, Repository } from '../dal';
import { User as Model } from '../models/user';

export class User {
  private repo: IRepository<Model>;

  public constructor(repo?: IRepository<Model>) {
    this.repo = repo || new Repository<Model>(Model.tableName);
  }

  public async getLoggedInUser(username: string) {
    const users = await this.repo.get({ username });
    return users[0];
  }
}
