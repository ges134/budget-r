import { IPresentation } from '../helpers';
import { ObjectSchema, object, number, string } from 'yup';

export class Budget implements IPresentation {
  public static readonly months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  public validationSchema: ObjectSchema<any> = object().shape({
    name: string().required('The name of the budgeting project is required'),
    description: string().notRequired(),
    startMonth: string()
      .required('The start month is required')
      .oneOf(
        Budget.months,
        'The month should be spelled correctly with a capital letter'
      ),
    startYear: number().required('The start year is required')
  });

  public constructor(
    public startMonth: string,
    public startYear: number,
    public name: string,
    public description: string
  ) {}
}
