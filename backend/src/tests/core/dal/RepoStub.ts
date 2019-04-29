import { IRepository } from '../../../core/dal';
import { Id } from '../../../core/models';
import { IOrder } from '../../../core/dal/Repository';

export class RepoStub<T extends Id> implements IRepository<T> {
  private db: T[];

  constructor() {
    this.db = Array<T>();
  }

  public async find(id: number): Promise<T> {
    return this.db.find(x => x.id === id);
  }

  public async get(filter: any, order: IOrder): Promise<T[]> {
    const filterProps = Object.getOwnPropertyNames(filter);
    const results = this.db.filter(item => {
      for (const filterProp of filterProps) {
        if (filter[filterProp] !== item[filterProp]) {
          return false;
        }
      }
      return true;
    });
    return results;
  }

  public async add(entity: T): Promise<number> {
    const id = this.db.length + 1;
    entity.id = id;
    this.db.push(entity);
    return id;
  }

  public delete(id: number): void {
    this.db.splice(id);
  }

  public update(entity: T): void {
    throw new Error('not implemented');
  }
}
