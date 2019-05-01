import { Id } from './Id';

export class Estimate implements Id {
  public static tableName: string = 'estimate';

  public id: number;
  public ledgerID: number;

  public constructor(
    public effectiveYear: number,
    public effectiveMonth: number,
    public amount: number,
    id?: number,
    ledgerID?: number
  ) {
    this.id = id || 0;
    this.ledgerID = ledgerID || 0;
  }
}
