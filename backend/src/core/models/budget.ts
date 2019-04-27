import Id from './Id';

export class Budget implements Id {
  public static tableName: string = 'budget';

  public id: number;

  public constructor(
    public startDate: Date,
    public userID: number,
    public name: string,
    public description: string,
    id?: number
  ) {
    this.id = id || -1;
  }
}
