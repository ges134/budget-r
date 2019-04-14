import { Signup } from './Signup';
import { isNullOrUndefined } from 'util';
import { Authentication } from './authentication';

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
}
