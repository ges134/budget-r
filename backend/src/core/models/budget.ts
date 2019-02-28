import Id from './Id';

export default class Budget implements Id {
  public static tableName: string = 'budget';
  public id: number;
  public startDate: Date;
  public userID: number;
}