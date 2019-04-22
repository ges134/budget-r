import { User as Presentation } from '../../models-folder';
import { User as Model } from '../../core/models/user';

export class Token {
  public static getUserFromDecoded(decoded: string | string[]): Presentation {
    if (Array.isArray(decoded)) {
      decoded = decoded[0];
    }

    const { id, username } = JSON.parse(decoded) as Model;
    return new Presentation(username, id);
  }
}
