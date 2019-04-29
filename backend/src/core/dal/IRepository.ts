import { Id } from '../models';
import { IOrder } from './Repository';

export interface IRepository<T extends Id> {
  find(id: number): Promise<T>;
  get(filter?: any, order?: IOrder): Promise<T[]>;
  add(entity: T): Promise<number>;
  delete(id: number): void;
  update(entity: T): void;
}
