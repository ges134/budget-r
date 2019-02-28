import Id from "../models/Id";
import { IOrder } from "./Repository";

export default interface IRepository<T extends Id> {
  find(id : number) : Promise<T>;
  get(filter: any, order: IOrder) : Promise<T[]>;
  add(entity : T) : void;
  delete(id : number) : void;
  update(entity : T) : void;
}