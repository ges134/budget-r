import 'mocha';
import { Estimate } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Estimate as Model } from '../../../core/models';
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
});
