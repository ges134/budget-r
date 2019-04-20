import { ValidationError } from 'yup';
import { Request, Response } from 'express';
import { Authentication as Service, Factory } from '../../core/services';
import { Login as Presentation } from '../../models-folder/presentations';
import { BadRequestError, NotFoundError } from '../errors';

export class Login {
  public async post(req: Request, res: Response) {
    const { identifier, password } = req.body;
    const presentation = new Presentation(identifier, password);

    try {
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      const token = await Factory.getInstance()
        .authentication()
        .authenticate(validated);
      res.status(200).send(token);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors);
      } else if (error instanceof BadRequestError) {
        res.status(400).send(error.message);
      } else if (error instanceof NotFoundError) {
        res.status(404).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
