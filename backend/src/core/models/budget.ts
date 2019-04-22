import Id from './Id';

export class Budget implements Id {
  public static tableName: string = 'budget';

  public constructor(
    public id: number,
    public startDate: Date,
    public userID: number,
    public name: string,
    public description: string
  ) {}
}
