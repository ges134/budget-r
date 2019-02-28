import Knex, { QueryBuilder } from "knex";
import Id from "../models/Id";
import IRepository from "./IRepository";
import KnexWrapper from "./KnexWrapper";

export enum orderBy {
  desc = 'desc',
  asc = 'asc',
}

export interface IOrder {
  col : string;
  orderBy : orderBy;
}

export default class Repository<T extends Id> implements IRepository<T> {
  private db : QueryBuilder;

  constructor(tableName : string) {
    this.db = KnexWrapper.getInstance().knex(tableName);
  }

  public async find(id : number) : Promise<T> {
    return this.db.where({id,}).first();
  }

  public async get(filter: any, order: IOrder) : Promise<T[]> {
    return this.db.where(filter).orderBy(order.col, order.orderBy);
  }

  public add(entity : T) : void {
    this.db.insert(entity);
  }

  public delete(id : number) : void {
    this.db.where({id,}).del();
  }

  public update(entity : T) : void {
    this.db.where(entity.id).update(entity);
  }
}