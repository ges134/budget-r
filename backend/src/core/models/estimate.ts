import { Id } from './Id';

export default class Estimate implements Id {
  public static tableName: string = 'estimate';
  public id: number;
  public effectiveYear: Date;
  public ledgerID: number;
}
