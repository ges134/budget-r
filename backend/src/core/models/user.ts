import { Id } from './Id';

export class User implements Id {
  public static tableName: string = 'user';
  public id: number;
  public username: string;
  public email: string;
  public password: string;
}
