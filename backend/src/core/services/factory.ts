import { Signup } from './Signup';
import { isNullOrUndefined } from 'util';
import { Authentication } from './authentication';
import { Budget } from './budget';
import { Ledger } from './ledger';
import { Estimate } from './estimate';
import { Security } from './security';

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
  private budgetInstance: Budget;
  private ledgerInstance: Ledger;
  private estimateInstance: Estimate;
  private securityInstance: Security;

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

  public budget(): Budget {
    if (isNullOrUndefined(this.budgetInstance)) {
      this.budgetInstance = new Budget();
    }

    return this.budgetInstance;
  }

  public ledger(): Ledger {
    if (isNullOrUndefined(this.ledgerInstance)) {
      this.ledgerInstance = new Ledger();
    }

    return this.ledgerInstance;
  }

  public estimate(): Estimate {
    if (isNullOrUndefined(this.estimateInstance)) {
      this.estimateInstance = new Estimate();
    }

    return this.estimateInstance;
  }

  public security(): Security {
    if (isNullOrUndefined(this.securityInstance)) {
      this.securityInstance = new Security();
    }

    return this.securityInstance;
  }
}
