export class NotFoundError extends Error {
  public static readonly genericErrorMessage: string =
    'The user does not exist.';

  constructor(message?: string) {
    super(message);
    this.message = message || NotFoundError.genericErrorMessage;
  }
}
