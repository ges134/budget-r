import { QueryBuilder } from 'knex';
import { Id } from '../models';
import { IRepository } from './IRepository';
import KnexWrapper from './KnexWrapper';

export enum orderBy {
  desc = 'desc',
  asc = 'asc'
}

export interface IOrder {
  col: string;
  orderBy: orderBy;
}

export class Repository<T extends Id> implements IRepository<T> {
  private db: QueryBuilder;

  constructor(tableName: string) {
    this.db = KnexWrapper.getInstance().knex(tableName);
  }

  public async find(id: number): Promise<T> {
    return this.db.where({ id }).first();
  }

  public async get(filter?: any, order?: IOrder): Promise<T[]> {
    let query = this.db.where(filter || {});
    if (order) {
      query = query.orderBy(order.col, order.orderBy);
    }
    return query;
  }

  public async add(entity: T): Promise<number> {
    const { id, ...rest } = entity;
    return (await this.db.insert({ ...rest }).returning('id')) as number;
  }

  public delete(id: number): void {
    this.db.where({ id }).del();
  }

  public async update(entity: T): Promise<void> {
    return this.db.where(entity.id).update(entity);
  }
}
