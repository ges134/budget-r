import { Signup } from './Signup';
import { isNullOrUndefined } from 'util';

export class Factory {
  public static getInstance() {
    if (isNullOrUndefined(this.instance)) {
      this.instance = new Factory();
    }

    return this.instance;
  }

  private static instance: Factory;
  private signupInstance: Signup;
  private constructor() {}

  public signup() {
    if (isNullOrUndefined(this.signupInstance)) {
      this.signupInstance = new Signup();
    }

    return this.signupInstance;
  }
}
