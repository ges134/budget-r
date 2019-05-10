import { Id } from './Id';

export class Ledger implements Id {
  public static tableName: string = 'ledger';

  public id: number;

  public constructor(
    public name: string,
    public budgetID: number,
    public parentLedgerID?: number,
    id?: number
  ) {
    this.id = id || 0;
  }
}
