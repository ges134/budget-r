import { Login as Presentation } from '../../models-folder/presentations';
import { User } from '../models/user';
import { IRepository, Repository } from '../dal';
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} from '../../routes/errors';
import { compareSync } from 'bcrypt';
import { sign, verify, decode } from 'jsonwebtoken';
import { jwtConfig } from '../../config';

export interface IToken {
  username: string;
  iat: number;
  exp: number;
}

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

  public async validateToken(token: string): Promise<User> {
    try {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      if (token) {
        const verified = verify(token, jwtConfig.secret) as IToken;
        const username = verified.username;

        const users = await this.repo.get({ username });
        const user = users[0];

        if (user) {
          return user;
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedError();
    }
  }
}
