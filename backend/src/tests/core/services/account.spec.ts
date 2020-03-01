import 'mocha';
import { Account } from '../../../core/services';
import { IRepository } from '../../../core/dal';
import { Account as Model } from '../../../core/models';
import { Account as Presentation } from '../../../models-folder/presentations/creation';
import { RepoStub } from '../dal/RepoStub';
import { expect } from 'chai';

describe('Account service', () => {
  let sut: Account;
  let repo: IRepository<Model>;

  beforeEach(async () => {
    repo = new RepoStub();

    sut = new Account(repo);
  });

  describe('add account', async () => {
    it('should add a new account in the database', async () => {
      // Arrange
      const userID = 1;
      const presentation = new Presentation(100, 'test account');

      // Act
      const accountID = await sut.addAccount(presentation, userID);

      // Assert
      const created = await repo.find(accountID);
      expect(created).to.not.be.undefined; // tslint:disable-line
    });
  });
});
