import { Budget, Id, Ledger, Estimate } from '../core/models';
import { IRepository } from '../core/dal';

export class TestHelper {
  public static sampleBudgets(): Budget[] {
    const today = new Date();
    const sample: Budget[] = [];

    for (let i = 1; i <= 5; i++) {
      let userID = 3;
      if (i < 3) {
        userID = 1;
      } else if (i >= 3 && i <= 4) {
        userID = 2;
      }

      sample.push(new Budget(today, userID, `Budget ${i}`, 'description', i));
    }

    return sample;
  }

  // 1, 2, 2, 3, 3, 1, 2, 3, 3, 2
  public static sampleLedgers(): Ledger[] {
    const sample: Ledger[] = [];
    for (let i = 1; i <= 10; i++) {
      let parentLedgerID: number;

      switch (i) {
        case 2:
        case 3:
          parentLedgerID = 1;
          break;
        case 4:
        case 5:
          parentLedgerID = 3;
          break;
        case 7:
        case 10:
          parentLedgerID = 6;
          break;
        case 8:
        case 9:
          parentLedgerID = 7;
          break;
        default:
          parentLedgerID = 0;
          break;
      }

      sample.push(new Ledger(`Ledger ${i}`, 1, i, parentLedgerID));
    }

    return sample;
  }

  public static sampleEstimates(): Estimate[] {
    const sample: Estimate[] = [];
    const today = new Date();

    for (let i = 1; i <= 10; i++) {
      sample.push(new Estimate(today.getFullYear(), i - 1, 100, i, 1));
    }

    return sample;
  }

  public static async estimatesForLedgers(
    ledgers: Ledger[],
    repo: IRepository<Estimate>
  ) {
    const parentLedgerIDs = ledgers.map(ledger => ledger.parentLedgerID);
    let ids = 1;
    const today = new Date();

    for (const ledger of ledgers) {
      if (!parentLedgerIDs.includes(ledger.id)) {
        for (let i = ids; i < ids + 12; i++) {
          await repo.add(
            new Estimate(
              today.getFullYear(),
              today.getMonth(),
              100,
              i,
              ledger.id
            )
          );
        }
        ids += 12;
      }
    }
  }

  public static async addManyToRepo<T extends Id>(
    entities: T[],
    repo: IRepository<T>
  ): Promise<any> {
    for (const entity of entities) {
      await repo.add(entity);
    }
  }
}
