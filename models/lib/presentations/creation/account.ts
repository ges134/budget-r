import { IPresentation } from '../../helpers';
import { ObjectSchema, object, number, string } from 'yup';

export class Account implements IPresentation {
  public validationSchema: ObjectSchema<any> = object().shape({
    initialAmount: number()
      .required('The initial amount is required.')
      .min(0, 'The initial amount of the account must be a positive number.'),
    accountName: string().required('The name of the account is required.')
  });

  public constructor(
    public initialAmount: number,
    public accountName: string
  ) {}
}
