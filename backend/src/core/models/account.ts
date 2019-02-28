import Id from './Id';

export default class Account implements Id {
  public static tableName: string = 'account';
  public id: number;
  public initialAmount: number;
  public accountName: string;
  public userID: number;
}