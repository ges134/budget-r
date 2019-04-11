import Knex, { QueryBuilder } from 'knex';
import Id from '../models/Id';
import IRepository from './IRepository';
import KnexWrapper from './KnexWrapper';

export enum orderBy {
  desc = 'desc',
  asc = 'asc'
}

export interface IOrder {
  col: string;
  orderBy: orderBy;
}

export default class Repository<T extends Id> implements IRepository<T> {
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

  public async add(entity: T): Promise<any> {
    await this.db.insert({ ...entity });
  }

  public delete(id: number): void {
    this.db.where({ id }).del();
  }

  public update(entity: T): void {
    this.db.where(entity.id).update(entity);
  }
}
