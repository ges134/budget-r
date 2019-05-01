import { IRepository, Repository } from '../dal';
import { Estimate as Model } from '../models';

export class Estimate {
  private repo: IRepository<Model>;

  public constructor(repo?: IRepository<Model>) {
    this.repo = repo || new Repository<Model>(Model.tableName);
  }

  public async ledgerHasEstimates(ledgerID: number): Promise<boolean> {
    const estimates = await this.repo.get({ ledgerID });
    return estimates.length > 0;
  }
}
