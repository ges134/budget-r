import { IPresentation } from '../helpers';
import { ObjectSchema, object, string, ref } from 'yup';

export class Signup implements IPresentation {
  public validationSchema: ObjectSchema<any> = object().shape({
    username: string()
      .max(250, 'An username must be under 250 characters')
      .required('An username is required'),
    email: string()
      .email('The email format is not valid')
      .max(250, 'the password must be under 250 characters')
      .required('An email is required'),
    password: string()
      .max(72, 'The password must be under 72 characters')
      .required('A password is required'),
    passwordConfirm: string()
      .max(72, 'The password confirmation must be 72 characters')
      .oneOf([ref('password'), null], 'Passwords must match')
      .required('A password confirmation is required')
  });

  constructor(
    public username: string,
    public password: string,
    public passwordConfirm: string,
    public email: string
  ) {}
}
