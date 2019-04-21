import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { isNullOrUndefined } from 'util';
import { Factory } from '../../core/services/factory';
import { User as Model } from '../../core/models/user';
import { User as Presentation } from '../../models-folder';

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
      let { decoded } = req.headers;
      if (Array.isArray(decoded)) {
        decoded = decoded[0];
      }

      const { id, username } = JSON.parse(decoded) as Model;
      const presentation = new Presentation(username, id);

      res.status(200).send(presentation);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
