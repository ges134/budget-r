import { Factory, Ledger as Service } from '../../core/services';
import { Request, Response } from 'express';
import { Token } from '../helpers';
import { Ledger as Presentation } from '../../models-folder';
import { ValidationError } from 'yup';
import { HttpError } from '../errors/httpError';
import { Ledger as PresentationModification } from '../../models-folder/presentations/modification';
import { BadRequestError } from '../errors';

export class Ledgers {
  private service: Service;

  public constructor(service?: Service) {
    this.service = service || Factory.getInstance().ledger();

    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async get(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      let { budgetID } = req.body;

      if (budgetID === undefined || budgetID === null) {
        budgetID = req.query.budgetID;

        if (budgetID === undefined || budgetID === null) {
          throw new BadRequestError('Missing budget identifier.');
        }
      }

      budgetID = Number.parseInt(budgetID, 10);

      const ledgers = await this.service.getLedgersForBudget(budgetID, user.id);

      res.status(200).send(ledgers);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.errorCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
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

  public async post(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      const { name, parentLedgerID, id } = req.body;
      const presentation = new PresentationModification(
        name,
        id,
        parentLedgerID
      );
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      await this.service.editLedger(validated, user.id);

      res.status(204).send();
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

  public async delete(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      const { id } = req.body;

      await this.service.deleteLedger(id, user.id);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.errorCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
