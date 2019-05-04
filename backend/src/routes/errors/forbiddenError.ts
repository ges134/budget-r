import { HttpError } from './httpError';

export class ForbiddenError extends HttpError {
  public static readonly genericErrorMessage: string =
    'You do not have the permissions';

  constructor(message?: string) {
    super(message || ForbiddenError.genericErrorMessage, 403);
  }
}
