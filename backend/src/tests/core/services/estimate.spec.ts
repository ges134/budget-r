import 'mocha';
import { Estimate } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Estimate as Model, Ledger as LedgerModel } from '../../../core/models';
import { RepoStub } from '../dal/RepoStub';
import { expect } from 'chai';
import { TestHelper } from '../../testHelper';

describe('estimate service', () => {
  let sut: Estimate;
  let repo: IRepository<Model>;

  beforeEach(async () => {
    repo = new RepoStub();
    sut = new Estimate(repo);
  });

  describe('ledger has estimates', () => {
    it('should return true if ledger has estimates', async () => {
      // Arrange
      TestHelper.addManyToRepo<Model>(TestHelper.sampleEstimates(), repo);

      // Act
      const result = await sut.ledgerHasEstimates(1);

      // Assert
      expect(result).to.be.true; // tslint:disable-line
    });

    it('should retun false if ledger does not have estimates', async () => {
      // Act
      const result = await sut.ledgerHasEstimates(1);

      // Assert
      expect(result).to.be.false; // tslint:disable-line
    });
  });

  describe('all ledgers has estimates', () => {
    let ledgers: LedgerModel[];
    let childLedgers: LedgerModel[];
    beforeEach(async () => {
      // Arrange
      const ledgerRepo = new RepoStub<LedgerModel>();
      ledgers = TestHelper.sampleLedgers();
      const [
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        ten
      ] = ledgers;
      childLedgers = [four, five, eight, nine];
      await TestHelper.addManyToRepo(ledgers, ledgerRepo);
      await TestHelper.estimatesForLedgers(ledgers, repo);
    });

    it('should return false if there is a parent ledger', async () => {
      // Act
      const result = await sut.allLedgerHasEstimates(
        ledgers.map(ledger => ledger.id)
      );

      // Assert
      expect(result).to.be.false; //tslint:disable-line
    });

    it('should return false if one ledger has no estimates', async () => {
      // Arrange
      childLedgers[0].id = 100;

      // Act
      const result = await sut.allLedgerHasEstimates(
        childLedgers.map(ledger => ledger.id)
      );

      // Assert
      expect(result).to.be.false; // tslint:disable-line
    });

    it('should return true if all ledgers have estimates', async () => {
      // Act
      const result = await sut.allLedgerHasEstimates(
        childLedgers.map(ledger => ledger.id)
      );

      // Assert
      expect(result).to.be.true; // tslint:disable-line
    });
  });
});
