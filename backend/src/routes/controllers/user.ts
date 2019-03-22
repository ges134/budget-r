import { Signup as Presentation } from '../../core/presentations/Signup';
import { Signup as Service } from '../../core/services/Signup';
import Repository from '../../core/dal/Repository';
import { User as Model } from '../../core/models/user';
import { validate, Validator, ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { restElement } from 'babel-types';

export default class User {
  public static getInstance() : User {
    if(this.instance === undefined || this.instance) {
      this.instance = new User();
    }

    return this.instance;
  }

  private static instance : User;
  private service : Service;

  private constructor() {
    this.service = new Service();
  }

  public put(req : Request, res: Response) {

    const presentation = this.service.presentationFromRequest(req);

    validate(presentation).then(errors => {
      if (errors.length > 0) {
        if(presentation.password !== presentation.passwordConfirm) {
          const newError = new ValidationError();
          newError.property = 'passwordConfirm';
          newError.constraints = {
            match: 'Passwords does not match',
          };
          
          errors.push(newError);

          this.sendBadRequest(res, errors);
        }
        
        try {
          this.service.createNewUser(presentation);
          res.status(200).send();
        } catch (error) {
          res.status(500).send(error);
        }
      } else {
        this.sendBadRequest(res, errors);
      }
    });
  }

  private sendBadRequest(res: Response, errors : ValidationError[]) {
    res.status(400).send(errors);
  }
}