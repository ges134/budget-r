import { HttpError } from './httpError';

export class BadRequestError extends HttpError {
  public static readonly genericErrorMessage: string =
    'The username/email and password does not match';

  constructor(message?: string) {
    super(message || BadRequestError.genericErrorMessage, 400);
  }
}
