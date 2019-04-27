import 'mocha';
import { Budget } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Budget as Model } from '../../../core/models/budget';
import { RepoStub } from '../dal/RepoStub';
import { expect } from 'chai';
import { Budget as Presentation } from '../../../models-folder';

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

      const budget = new Model(
        today,
        userID,
        `${nameTemplate} ${i}`,
        'description',
        i
      );
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

  describe('add budget', () => {
    it('should add a new budget in the API', async () => {
      // Arrange
      const userID = 1;
      const presentation = new Presentation(
        'January',
        2020,
        'A budgeting project',
        'A budgetting project'
      );
      const expectedDate = new Date(2020, 0, 1);

      // Act
      const budgetID = await sut.addBudget(presentation, userID);

      // Assert
      const created = await repo.find(budgetID);
      expect(created).to.not.be.undefined; //tslint:disable-line
      expect(created.startDate.getDate()).to.equal(expectedDate.getDate());
      expect(created.startDate.getMonth()).to.equal(expectedDate.getMonth());
      expect(created.startDate.getFullYear()).to.equal(
        expectedDate.getFullYear()
      );
    });
  });
});
