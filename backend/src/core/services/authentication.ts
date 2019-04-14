import { Login as Presentation } from '../../models-folder/presentations';
import { User } from '../models/user';
import { IRepository, Repository } from '../dal';
import { NotFoundError, BadRequestError } from '../../routes/errors';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config';

export class Authentication {
  private repo: IRepository<User>;

  public constructor(repo?: IRepository<User>) {
    this.repo = repo || new Repository<User>(User.tableName);
  }

  public async authenticate(presentation: Presentation): Promise<string> {
    const { identifier, password } = presentation;

    let user = (await this.repo.get({ username: identifier }))[0];
    if (user) {
      user = (await this.repo.get({ email: identifier }))[0];
      if (!user) {
        throw new NotFoundError('The user does not exist.');
      }
    }

    const isValid = compareSync(password, user.password);

    if (isValid) {
      return sign({ identifier }, jwtConfig.secret, { expiresIn: '1h' });
    } else {
      throw new BadRequestError(
        'The username/email and passwords does not match'
      );
    }
  }
}
