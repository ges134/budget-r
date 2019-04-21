import * as Yup from 'yup';

/**
 * By implementing this interface
 * You're also mentionning that the object
 * is available for modification
 */
export interface IPresentation {
  validationSchema: Yup.ObjectSchema<any>;
}
