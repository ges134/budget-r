import { Factory, Ledger as Service } from '../../core/services';
import { Request, Response } from 'express';
import { Token } from '../helpers';
import { Ledger as Presentation } from '../../models-folder';
import { ValidationError } from 'yup';
import { HttpError } from '../errors/httpError';

export class Ledgers {
  private service: Service; // FIXME: Add Ledger

  public constructor(service?: Service) {
    this.service = service || Factory.getInstance().ledger();
  }

  public async put(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      const { name, budgetID, parentLedgerID } = req.body;
      const presentation = new Presentation(name, budgetID, parentLedgerID);
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      const id = await this.service.addLedger(validated, user.id);

      res.status(201).send(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors);
      } else if (error instanceof HttpError) {
        res.status(error.errorCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
