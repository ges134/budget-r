import Id from './Id';

export default class User implements Id {
  id: number;
  username: string;
  password: string;
  static tableName: string = 'user';
}