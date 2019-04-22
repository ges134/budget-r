import { Request, Response } from 'express';
import { Token } from '../helpers';
import { Factory } from '../../core/services';

export class Budgets {
  public async get(req: Request, res: Response) {
    try {
      const { decoded } = req.headers;
      const user = Token.getUserFromDecoded(decoded);
      const budgets = Factory.getInstance()
        .budget()
        .budgetsFromUser(user.id);

      res.status(200).send(budgets);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
