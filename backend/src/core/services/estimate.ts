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

  /**
   * Checks if all the ledgers passed as parameter have estimates. This checkup does not
   * take into consideration parent-child relationship. If there's a parent ledger passed
   * has an argument, it should return false.
   * @param ledgerIDs the ledgers to check
   */
  public async allLedgerHasEstimates(ledgerIDs: number[]): Promise<boolean> {
    let hasEstimates = true;

    for (const ledgerID of ledgerIDs) {
      const ledgerHasEstimates = await this.ledgerHasEstimates(ledgerID);
      if (!ledgerHasEstimates) {
        hasEstimates = false;
        break;
      }
    }

    return hasEstimates;
  }
}
