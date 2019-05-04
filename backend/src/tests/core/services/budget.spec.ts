import 'mocha';
import { Budget, Estimate, Ledger, Security } from '../../../core/services';
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
  let securityService: Security;

  beforeEach(async () => {
    repo = new RepoStub();
    estimateRepo = new RepoStub();
    ledgerRepo = new RepoStub();

    estimateService = new Estimate(estimateRepo);
    securityService = new Security(repo, ledgerRepo, estimateRepo);
    ledgerService = new Ledger(ledgerRepo, estimateService, securityService);

    sut = new Budget(repo, ledgerService, estimateService);
    await TestHelper.addManyToRepo<Model>(TestHelper.sampleBudgets(), repo);
  });

  describe('budget presentations from user', () => {
    it('should return all budget presentations from user', async () => {
      // Arrange
      const id = 1;
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
});
