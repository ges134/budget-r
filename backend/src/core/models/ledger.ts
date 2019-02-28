import Id from './Id'

export default class Ledger implements Id {
  public static tableName: string = 'ledger';
  public id: number;
  public name: string;
  public parentLedgerID: number;
  public budgetID: number;
}