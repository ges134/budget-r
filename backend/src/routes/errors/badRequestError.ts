export class BadRequestError extends Error {
  public static readonly genericErrorMessage: string =
    'The username/email and password does not match';

  constructor(message?: string) {
    super(message);
    this.message = message || BadRequestError.genericErrorMessage;
  }
}
