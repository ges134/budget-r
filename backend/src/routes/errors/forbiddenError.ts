import { HttpError } from './httpError';

export class ForbiddenError extends HttpError {
  public static readonly genericErrorMessage: string =
    'The username/email and password does not match';

  constructor(message?: string) {
    super(message || ForbiddenError.genericErrorMessage, 403);
  }
}
