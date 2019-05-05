import { Request, Response } from 'express';
import { Token } from '../helpers';
import { Factory } from '../../core/services';
import { Budget as Presentation } from '../../models-folder';
import { ValidationError } from 'yup';

export class Budgets {
  public async get(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);
      const budgets = await Factory.getInstance()
        .budget()
        .budgetPresentationsFromUser(user.id);

      res.status(200).send(budgets);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  public async put(req: Request, res: Response) {
    try {
      const { name, description, startMonth, startYear } = req.body;
      const presentation = new Presentation(
        startMonth,
        startYear,
        name,
        description
      );
      const validated = await presentation.validationSchema.validate(
        presentation,
        { abortEarly: false }
      );

      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);

      const budgetId = await Factory.getInstance()
        .budget()
        .addBudget(validated, user.id);

      res.status(201).send(budgetId);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
