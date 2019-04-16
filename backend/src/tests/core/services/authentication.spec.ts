import { Login as Presentation } from '../../../models-folder';
import { expect } from 'chai';
import 'mocha';
import { Authentication } from '../../../core/services';
import { User as Model } from '../../../core/models/user';
import { IRepository } from '../../../core/dal';
import { RepoStub } from '../dal/RepoStub';
import { BadRequestError, NotFoundError } from '../../../routes/errors';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../../../config';
import { hash } from 'bcrypt';

describe('Authentication service', () => {
  let sut: Authentication;
  let repo: IRepository<Model>;
  let presentation: Presentation;

  const email = 'anemail@domain.com';
  const password = 'password';
  const username = 'anUsername';

  beforeEach(async () => {
    repo = new RepoStub();
    presentation = new Presentation(email, password);

    sut = new Authentication(repo);

    const model = new Model();
    model.email = email;
    model.password = await hash(password, 10);
    model.username = username;
    repo.add(model);
  });

  it('should throw a BadRequestError if the password is incorrect', async () => {
    // Arrange
    presentation.password = 'nope';

    try {
      await sut.authenticate(presentation);
      expect.fail();
    } catch (err) {
      expect(err).to.be.an.instanceOf(BadRequestError);
    }
  });

  it('should throw a NotFoundError if the identifier does not exist', async () => {
    // Arrange
    repo.delete(0);

    // Act and Assert
    try {
      await sut.authenticate(presentation);
      expect.fail();
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotFoundError);
    }
  });

  it('should should return a JWT token if authentication is successful', async () => {
    // Act
    const result = await sut.authenticate(presentation);

    // Assert
    const verified = verify(result, jwtConfig.secret);
    expect(verified).to.not.be.undefined; //tslint:disable-line
  });
});
