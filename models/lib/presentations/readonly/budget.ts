import { IStep } from '../commons';

export class Budget {
  public constructor(
    public id: number,
    public startMonth: number,
    public startYear: number,
    public name: string,
    public description: string,
    public progress: IStep
  ) {}
}
