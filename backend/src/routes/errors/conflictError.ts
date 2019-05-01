import { HttpError } from './httpError';

/**
 * Since the RFC for conflict mentions that
 * the payload has to give instructions to
 * resolve the conflict, the message has to
 * be specified when creating a new object.
 */
export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}
