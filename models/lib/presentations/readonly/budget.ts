export class Budget {
  public constructor(
    public id: number,
    public startMonth: number,
    public startYear: number,
    public userID: number,
    public name: string,
    public description: string
  ) {}
}
