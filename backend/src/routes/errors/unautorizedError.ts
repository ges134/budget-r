import { HttpError } from './httpError';

export class UnauthorizedError extends HttpError {
  public static readonly genericErrorMessage: string = 'Token is not valid';

  constructor(message?: string) {
    super(message || UnauthorizedError.genericErrorMessage, 401);
  }
}
