import { ILedger as Common } from '../commons';

export class Ledger implements Common {
  public constructor(
    public id: number,
    public name: string,
    public budgetID: number,
    public depth: number,
    public parentLedgerID?: number
  ) {}
}
