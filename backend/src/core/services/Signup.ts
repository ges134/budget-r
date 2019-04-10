import { Signup as Presentation } from '../../models-folder/presentations';
import { Request } from 'express';
import { User } from '../models/user';
import IRepository from '../dal/IRepository';
import Repository from '../dal/Repository';
import { hash } from 'bcrypt';

export class Signup {
  private repo: IRepository<User>;

  public constructor(repo?: IRepository<User>) {
    this.repo = repo || new Repository<User>(User.tableName);
  }

  public presentationFromRequest(req: Request): Presentation {
    const { email, password, passwordConfirm, username } = req.body;
    return new Presentation(email, password, passwordConfirm, email);
  }

  public userFromPresentation(presentation: Presentation): User {
    const { email, password, username } = presentation;

    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;

    return user;
  }

  public async createNewUser(presentation: Presentation): Promise<User> {
    const user = this.userFromPresentation(presentation);
    const encrypted = await hash(user.password, 10);
    user.password = encrypted;
    this.repo.add(user);
    return user;
  }
}
