import { Request, Response } from 'express';
import { Token } from '../helpers';
import { ValidationError } from 'yup';
import { Account as CreationPresentation } from '../../models-folder/presentations/creation';
import { Account as Service, Factory } from '../../core/services';

export class Account {
  private service: Service;

  public constructor(service?: Service) {
    this.service = service || Factory.getInstance().account();

    this.post = this.post.bind(this);
  }

  public async post(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      const { initialAmount, accountName } = req.body;
      const presentation = new CreationPresentation(initialAmount, accountName);
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      const id = await this.service.addAccount(validated, user.id);

      res.status(201).send(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
