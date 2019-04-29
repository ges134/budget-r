import { IPresentation } from '../helpers';
import { ObjectSchema, object, number, string } from 'yup';

export class Ledger implements IPresentation {
  public validationSchema: ObjectSchema<any> = object().shape({
    name: string().required('The name of the ledger is required'),
    budgetID: number().required(
      'The identifier of the budgetting project is required'
    ),
    parentLedgerID: number().notRequired()
  });

  public constructor(
    public name: string,
    public budgetID: number,
    public parentLedgerID?: number
  ) {}
}
