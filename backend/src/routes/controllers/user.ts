import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { isNullOrUndefined } from 'util';
import { Factory } from '../../core/services/factory';
import { Token } from '../helpers';

export default class User {
  public static getInstance(): User {
    if (isNullOrUndefined(this.instance)) {
      this.instance = new User();
    }

    return this.instance;
  }

  private static instance: User;
  private constructor() {}

  public async put(req: Request, res: Response) {
    const service = Factory.getInstance().signup();
    const presentation = service.presentationFromRequest(req);
    try {
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      service.createNewUser(validated);
      res.status(200).send('success!');
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors);
      } else {
        res.status(500).send(error);
      }
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const presentation = Token.getUserFromDecoded(decoded);
      res.status(200).send(presentation);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
