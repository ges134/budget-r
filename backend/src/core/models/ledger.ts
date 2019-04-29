import Id from './Id';

export class Ledger implements Id {
  public static tableName: string = 'ledger';

  public id: number;
  public parentLedgerID: number;

  public constructor(
    public name: string,
    public budgetID: number,
    id?: number,
    parentLedgerID?: number
  ) {
    this.id = id || 0;
    this.parentLedgerID = parentLedgerID || 0;
  }
}
