import 'mocha';
import { Budget } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Budget as Model } from '../../../core/models/budget';
import { RepoStub } from '../dal/RepoStub';
import { expect } from 'chai';

describe('Budget service', () => {
  let sut: Budget;
  let repo: IRepository<Model>;
  const today = new Date();
  const nameTemplate = 'Budget';

  beforeEach(async () => {
    repo = new RepoStub();
    sut = new Budget(repo);

    for (let i = 1; i <= 5; i++) {
      let userID = 3;
      if (i < 3) {
        userID = 1;
      } else if (i >= 3 && i <= 4) {
        userID = 2;
      }

      const budget = new Model();
      budget.id = i;
      budget.startDate = today;
      budget.userID = userID;

      await repo.add(budget);
    }
  });

  describe('budgets from user', () => {
    it('should return all budgets from user', async () => {
      // Arrange
      const id = 1;

      // Act
      const result = await sut.budgetsFromUser(id);

      // Assert
      expect(result).to.have.lengthOf(2);
      expect(result[0].userID).to.equal(id);
      expect(result[1].userID).to.equal(id);
    });
  });
});
