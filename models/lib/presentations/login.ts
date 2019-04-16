import { IPresentation } from '../helpers';
import { ObjectSchema, object, string } from 'yup';

export class Login implements IPresentation {
  public validationSchema: ObjectSchema<any> = object().shape({
    identifier: string()
      .max(250, 'An username or an email address must be under 250 characters')
      .required('An username or an email address is required.'),
    password: string()
      .max(72, 'The password must be under 72 characters')
      .required('A password is required')
  });

  constructor(public identifier: string, public password: string) {}
}
