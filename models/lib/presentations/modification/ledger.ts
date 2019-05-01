import { ILedger } from '../commons';
import { IPresentation } from '../../helpers';
import { ObjectSchema, object, number, string } from 'yup';

export class Ledger implements ILedger, IPresentation {
  public validationSchema: ObjectSchema<any> = object().shape({
    name: string().required('The name of the ledger is required'),
    parentLedgerID: number().notRequired(),
    id: number().required('The id of the ledger to be modificated is required')
  });

  public constructor(
    public name: string,
    public id: number,
    public parentLedgerID?: number
  ) {}
}
