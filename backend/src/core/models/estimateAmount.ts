import Id from './Id';

export default class EstimateAmount implements Id {
  public static tableName: string = 'estimateAmount';
  public id: number;
  public effectiveMonth: Date;
  public amount: number;
  public estimateID: number;
}