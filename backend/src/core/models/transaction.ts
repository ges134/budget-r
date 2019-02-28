import Id from './Id';

export default class Transaction implements Id {
  public static tableName: string = 'transaction';
  public id: number;
  public amount: number;
  public effectiveDate: Date;
  public description: string;
  public accountID: number;
  public ledgerID: number;
}