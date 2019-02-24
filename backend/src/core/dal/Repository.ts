import Id from "../models/Id";
import IRepository from "./IRepository";
import Knex, { QueryBuilder } from "knex";
import KnexWrapper from "./KnexWrapper";

export enum orderBy {
  desc = 'desc',
  asc = 'asc',
}

export interface order {
  col : string;
  orderBy : orderBy;
}

export default class Repository<T extends Id> implements IRepository<T> {
  private db : QueryBuilder;

  constructor(tableName : string) {
    this.db = KnexWrapper.getInstance().knex(tableName);
  }

  async find(id : number) : Promise<T> {
    return await this.db.where({id,}).first();
  }

  async get(filter: any, order: orderBy, orderColumn: string) : Promise<T[]> {
    return await this.db.where(filter).orderBy(orderColumn, order);
  }

  add(entity : T) : void {
    this.db.insert(entity);
  }

  delete(id : number) : void {
    this.db.where({id,}).del();
  }

  update(entity : T) : void {
    this.db.where(entity.id).update(entity);
  }
}