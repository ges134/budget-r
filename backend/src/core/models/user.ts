import Id from './Id';

export default class User implements Id {
  public static tableName: string = 'user';
  public id: number;
  public username: string;
  public password: string;
}