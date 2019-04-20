export class UnauthorizedError extends Error {
  public static readonly genericErrorMessage: string = 'Token is not valid';

  constructor(message?: string) {
    super(message);
    this.message = message || UnauthorizedError.genericErrorMessage;
  }
}
