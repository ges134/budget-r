import { Id } from './Id';

export class Account implements Id {
  public static tableName: string = 'account';

  public id: number;

  public constructor(
    public initialAmount: number,
    public accountName: string,
    public userID: number,
    id?: number
  ) {
    this.id = id || 0;
  }
}
