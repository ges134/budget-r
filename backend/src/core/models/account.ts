import Id from './Id';

export default class Account implements Id {
  id: number;
  initialAmount: number;
  accountName: string;
  userID: number;
  static tableName: string = 'account';
}