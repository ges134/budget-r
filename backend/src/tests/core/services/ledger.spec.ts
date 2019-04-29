import 'mocha';
import { Ledger, Budget } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Ledger as Model, Budget as BudgetModel } from '../../../core/models';
import { RepoStub } from '../dal/RepoStub';
import { Ledger as Presentation } from '../../../models-folder';
import { expect } from 'chai';
import { TestHelper } from '../../testHelper';
import { ForbiddenError } from '../../../routes/errors';

describe('Ledger service', () => {
  let sut: Ledger;
  let repo: IRepository<Model>;

  let budgetService: Budget;
  let budgetRepo: IRepository<BudgetModel>;

  let presentation: Presentation;

  beforeEach(async () => {
    repo = new RepoStub();
    budgetRepo = new RepoStub();
    await TestHelper.addManyToRepo<BudgetModel>(
      TestHelper.sampleBudgets(),
      budgetRepo
    );

    budgetService = new Budget(budgetRepo);
    sut = new Ledger(repo, budgetService);

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
});
