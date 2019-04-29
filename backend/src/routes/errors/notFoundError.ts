import { HttpError } from './httpError';

export class NotFoundError extends HttpError {
  public static readonly genericErrorMessage: string =
    'The user does not exist.';

  constructor(message?: string) {
    super(message || NotFoundError.genericErrorMessage, 404);
  }
}
