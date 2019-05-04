import 'mocha';
import { expect } from 'chai';
import { Security } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Budget, Ledger, Estimate } from '../../../core/models';
import { RepoStub } from '../dal/RepoStub';
import { ForbiddenError } from '../../../routes/errors';
import { TestHelper } from '../../testHelper';

describe('security service', () => {
  let sut: Security;
  let budgetRepo: IRepository<Budget>;
  let ledgerRepo: IRepository<Ledger>;
  let estimateRepo: IRepository<Estimate>;

  beforeEach(async () => {
    budgetRepo = new RepoStub();
    ledgerRepo = new RepoStub();
    estimateRepo = new RepoStub();

    await TestHelper.addManyToRepo<Budget>(
      TestHelper.sampleBudgets(),
      budgetRepo
    );

    await TestHelper.addManyToRepo<Ledger>(
      TestHelper.sampleLedgers(),
      ledgerRepo
    );

    sut = new Security(budgetRepo, ledgerRepo, estimateRepo);
  });

  describe('throw if budget budget does not belong to user', () => {
    it('throw if condition is not met', async () => {
      // Act and assert
      try {
        await sut.throwIfBudgetDoesNotBelongToUser(1, 2);
        expect.fail();
      } catch (err) {
        expect(err).to.be.an.instanceOf(ForbiddenError);
      }
    });

    it('do nothing if condition is unmet', async () => {
      // Act
      await sut.throwIfBudgetDoesNotBelongToUser(1, 1);
    });
  });

  describe('throw if ledger does not belong to user', () => {
    let ledger: Ledger;
    beforeEach(async () => {
      await TestHelper.addManyToRepo<Ledger>(
        TestHelper.sampleLedgers(),
        ledgerRepo
      );

      ledger = await ledgerRepo.find(2);
    });

    it('should throw an error if the condition is met', async () => {
      // Arrange
      ledger.budgetID = 4;

      // Act and assert
      try {
        await sut.throwIfLedgerDoesNotBelongToUser(ledger, 1);
        expect.fail();
      } catch (err) {
        expect(err).to.be.instanceOf(ForbiddenError);
      }
    });

    it('should do nothing if the condition is met', async () => {
      // Act
      await sut.throwIfLedgerDoesNotBelongToUser(ledger, 1);
    });
  });
});
