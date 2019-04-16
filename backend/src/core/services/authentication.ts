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
    if (!user) {
      user = (await this.repo.get({ email: identifier }))[0];
      if (!user) {
        throw new NotFoundError();
      }
    }

    const isValid = compareSync(password, user.password);

    if (isValid) {
      return sign(
        { username: user.username },
        jwtConfig.secret,
        jwtConfig.options
      );
    } else {
      throw new BadRequestError();
    }
  }
}
