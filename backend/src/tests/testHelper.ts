import { Budget, Id } from '../core/models';
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

  public static async addManyToRepo<T extends Id>(
    entities: T[],
    repo: IRepository<T>
  ): Promise<any> {
    for (const entity of entities) {
      await repo.add(entity);
    }
  }
}
