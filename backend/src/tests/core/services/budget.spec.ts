import 'mocha';
import { Budget, Estimate, Ledger } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import {
  Budget as Model,
  Ledger as LedgerModel,
  Estimate as EstimateModel
} from '../../../core/models';
import { RepoStub } from '../dal/RepoStub';
import { expect } from 'chai';
import { Budget as Presentation } from '../../../models-folder';
import { TestHelper } from '../../testHelper';

describe('Budget service', () => {
  let sut: Budget;
  let repo: IRepository<Model>;

  let estimateRepo: IRepository<EstimateModel>;
  let ledgerRepo: IRepository<LedgerModel>;

  let estimateService: Estimate;
  let ledgerService: Ledger;

  beforeEach(async () => {
    repo = new RepoStub();
    estimateRepo = new RepoStub();
    ledgerRepo = new RepoStub();

    estimateService = new Estimate();
    ledgerService = new Ledger(ledgerRepo); // FIXME: Initialize properly.

    sut = new Budget(repo, ledgerService, estimateService);
    await TestHelper.addManyToRepo<Model>(TestHelper.sampleBudgets(), repo);
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

  describe('budget presentations from user', () => {
    it('should return all budget presentations from user', async () => {
      // Arrange
      const id = 1;
      const ledgerRepo = new RepoStub<LedgerModel>();
      const estimateRepo = new RepoStub<EstimateModel>();
      await ledgerRepo.add(new LedgerModel('ledger', 1, 1));
      await estimateRepo.add(new EstimateModel(2019, 0, 100, 1, 1));

      // Act
      const result = await sut.budgetPresentationsFromUser(id);

      // Assert
      expect(result).to.have.lengthOf(2);
      expect(result[0].progress.step).to.equal(3);
      expect(result[1].progress.step).to.equal(1);
    });
  });

  describe('add budget', () => {
    it('should add a new budget in the database', async () => {
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

  describe('budget belongs to user', () => {
    it('should return true if it belongs to the user', async () => {
      // Act
      const result = await sut.budgetBelongsToUser(1, 1);

      // Assert
      expect(result).to.be.true; // tslint:disable-line
    });

    it('should return false if it does not belongs to the user', async () => {
      // Act
      const result = await sut.budgetBelongsToUser(1, 2);

      // Assert
      expect(result).to.be.false; // tslint:disable-line
    });
  });
});
