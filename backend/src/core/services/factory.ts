import { Signup } from './Signup';
import { isNullOrUndefined } from 'util';
import { Authentication } from './authentication';
import { User } from './user';

export class Factory {
  public static getInstance() {
    if (isNullOrUndefined(this.instance)) {
      this.instance = new Factory();
    }

    return this.instance;
  }

  private static instance: Factory;

  private signupInstance: Signup;
  private authenticationInstance: Authentication;
  private userInstance: User;

  private constructor() {}

  public signup(): Signup {
    if (isNullOrUndefined(this.signupInstance)) {
      this.signupInstance = new Signup();
    }

    return this.signupInstance;
  }

  public authentication(): Authentication {
    if (isNullOrUndefined(this.authenticationInstance)) {
      this.authenticationInstance = new Authentication();
    }

    return this.authenticationInstance;
  }

  public user(): User {
    if (isNullOrUndefined(this.userInstance)) {
      this.userInstance = new User();
    }

    return this.userInstance;
  }
}
