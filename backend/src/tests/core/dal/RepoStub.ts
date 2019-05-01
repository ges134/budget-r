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

  public async delete(id: number): Promise<void> {
    this.db.splice(id - 1, 1);
  }

  public async update(entity: T): Promise<void> {
    const found = await this.find(entity.id);
    const index = this.db.indexOf(found);
    this.db[index] = entity;
  }
}
