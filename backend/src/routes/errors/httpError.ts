export class HttpError extends Error {
  public errorCode: number;

  public constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }
}
