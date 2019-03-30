// tslint:disable-next-line: no-implicit-dependencies
import { Signup as Presentation } from '../../../../models';
import { Signup as Service } from '../../core/services/Signup';
import Repository from '../../core/dal/Repository';
import { User as Model } from '../../core/models/user';
import { Request, Response } from 'express';
import { ValidationError } from 'yup';

export default class User {
  public static getInstance(): User {
    if (this.instance === undefined || this.instance) {
      this.instance = new User();
    }

    return this.instance;
  }

  private static instance: User;
  private service: Service;

  private constructor() {
    this.service = new Service();
  }

  public async put(req: Request, res: Response) {
    const presentation = this.service.presentationFromRequest(req);
    try {
      const validated = presentation.validationSchema.validateSync(
        presentation
      );

      if (validated.password !== validated.passwordConfirm) {
        throw new ValidationError('Passwords does not matchs', validated, '');
      }

      this.service.createNewUser(validated);
    } catch (error) {
      if (error instanceof ValidationError) {
        this.sendBadRequest(res, [error]);
      } else {
        res.status(500).send(error);
      }
    }
  }

  private sendBadRequest(res: Response, errors: ValidationError[]) {
    res.status(400).send(errors);
  }
}
