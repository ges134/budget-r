import 'mocha';
import { Ledger, Estimate, Security } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import {
  Ledger as Model,
  Budget as BudgetModel,
  Estimate as EstimateModel
} from '../../../core/models';
import { RepoStub } from '../dal/RepoStub';
import { Ledger as Presentation } from '../../../models-folder';
import { expect } from 'chai';
import { TestHelper } from '../../testHelper';
import { ForbiddenError, ConflictError } from '../../../routes/errors';
import { Ledger as ModificationPresentation } from '../../../models-folder/presentations/modification';

describe('Ledger service', () => {
  let sut: Ledger;
  let repo: IRepository<Model>;

  let budgetRepo: IRepository<BudgetModel>;
  let estimateRepo: IRepository<EstimateModel>;

  let estimateService: Estimate;
  let securityService: Security;

  let presentation: Presentation;

  beforeEach(async () => {
    repo = new RepoStub();
    budgetRepo = new RepoStub();
    await TestHelper.addManyToRepo<BudgetModel>(
      TestHelper.sampleBudgets(),
      budgetRepo
    );
    estimateRepo = new RepoStub();
    estimateService = new Estimate(estimateRepo);
    securityService = new Security(budgetRepo, repo, estimateRepo);
    sut = new Ledger(repo, estimateService, securityService);

    presentation = new Presentation('Ledger', 1);
  });

  describe('add ledger', () => {
    it('should add a new ledger if the budget id is linked', async () => {
      // Act
      const result = await sut.addLedger(presentation, 1);

      // Assert
      const created = await repo.find(result);
      expect(created).to.not.be.undefined; //tslint:disable-line
    });

    it('should throw a forbidden error if the budget id is not valid', async () => {
      // Act and Assert
      try {
        await sut.addLedger(presentation, 2);
        expect.fail();
      } catch (err) {
        expect(err).to.be.an.instanceOf(ForbiddenError);
      }
    });
  });

  describe('get ledgers for budget', () => {
    beforeEach(async () => {
      await TestHelper.addManyToRepo<Model>(TestHelper.sampleLedgers(), repo);
    });

    it('should throw a forbidden error if the budget id does not belong to user', async () => {
      // Act and Assert
      try {
        await sut.getLedgersForBudget(1, 2);
        expect.fail();
      } catch (err) {
        expect(err).to.be.an.instanceOf(ForbiddenError);
      }
    });

    it('should give ledgers ordered by their parent and child', async () => {
      // Act
      const result = await sut.getLedgersForBudget(1, 1);

      // Assert
      // Expected array should have the following depths [1, 2, 2, 3, 3, 1, 2, 3, 3, 2]
      expect(result.length).to.equal(10);
      expect(result[0].depth).to.equal(1);
      expect(result[1].depth).to.equal(2);
      expect(result[2].depth).to.equal(2);
      expect(result[3].depth).to.equal(3);
      expect(result[4].depth).to.equal(3);
      expect(result[5].depth).to.equal(1);
      expect(result[6].depth).to.equal(2);
      expect(result[7].depth).to.equal(3);
      expect(result[8].depth).to.equal(3);
      expect(result[9].depth).to.equal(2);
    });
  });

  describe('child ledgers', () => {
    beforeEach(async () => {
      await TestHelper.addManyToRepo<Model>(TestHelper.sampleLedgers(), repo);
    });

    it('should throw a forbidden error if the budget id does not belong to user', async () => {
      // Act and Assert
      try {
        await sut.childLedgers(1, 2);
        expect.fail();
      } catch (err) {
        expect(err).to.be.an.instanceOf(ForbiddenError);
      }
    });

    it('should give ledgers ordered by their parent and child', async () => {
      // Act
      const result = await sut.childLedgers(1, 1);

      // Assert
      // Expected array should have the following depths [1, 2, 2, 3, 3, 1, 2, 3, 3, 2]
      expect(result.length).to.equal(6);
      expect(result[0].depth).to.equal(2);
      expect(result[1].depth).to.equal(3);
      expect(result[2].depth).to.equal(3);
      expect(result[3].depth).to.equal(3);
      expect(result[4].depth).to.equal(3);
      expect(result[5].depth).to.equal(2);
      expect(result[0].id).to.equal(2);
      expect(result[1].id).to.equal(4);
      expect(result[2].id).to.equal(5);
      expect(result[3].id).to.equal(8);
      expect(result[4].id).to.equal(9);
      expect(result[5].id).to.equal(10);
    });
  });

  describe('edit ledger', () => {
    let entityToEdit: Model;
    let modificationPresentation: ModificationPresentation;

    beforeEach(async () => {
      await TestHelper.addManyToRepo<Model>(TestHelper.sampleLedgers(), repo);

      entityToEdit = await repo.find(1);
      const secondEntity = await repo.find(2);
      secondEntity.parentLedgerID = 0;
      secondEntity.name = 'Another ledger';
      secondEntity.budgetID = 4;

      modificationPresentation = new ModificationPresentation(
        'modified ledger',
        1,
        0
      );
    });

    it('should throw a ForbiddenError if a ledger does not belong to user', async () => {
      // Arrange
      modificationPresentation.id = 2;

      // Act and assert
      try {
        await sut.editLedger(modificationPresentation, 1);
        expect.fail();
      } catch (err) {
        expect(err).to.be.instanceOf(ForbiddenError);
      }
    });

    it('should edit ledger name and parent ledger.', async () => {
      // Act
      await sut.editLedger(modificationPresentation, 1);

      // Assert
      const modified = await repo.find(1);
      expect(modified.name).to.equal('modified ledger');
      expect(modified.parentLedgerID).to.equal(0);
    });
  });

  describe('delete ledger', () => {
    beforeEach(async () => {
      await TestHelper.addManyToRepo<Model>(TestHelper.sampleLedgers(), repo);

      const secondEntity = await repo.find(2);
      secondEntity.parentLedgerID = 0;
      secondEntity.name = 'Another ledger';
      secondEntity.budgetID = 4;
    });

    it('should throw a forbiden error if the ledger does not belong to the user', async () => {
      // Act and assert
      try {
        await sut.deleteLedger(2, 1);
        expect.fail();
      } catch (err) {
        expect(err).to.be.instanceOf(ForbiddenError);
      }
    });

    it('should throw a conflict error if the ledger has estimates attached', async () => {
      // Arrange
      TestHelper.addManyToRepo<EstimateModel>(
        TestHelper.sampleEstimates(),
        estimateRepo
      );

      // Act and assert
      try {
        await sut.deleteLedger(1, 1);
        expect.fail();
      } catch (err) {
        expect(err).to.be.instanceOf(ConflictError);
      }
    });

    it('should delete ledger if the request is valid', async () => {
      // Act
      await sut.deleteLedger(1, 1);

      // Assert
      const entity = await repo.find(1);
      expect(entity).to.be.undefined; //tslint:disable-line
    });
  });
});
