import Knex from "knex";
import KnexAdapter from "./knexAdapter";

export default class KnexWrapper {
  private static instance : KnexWrapper;
  public knex : Knex;
  
  private constructor() {
    this.knex = KnexAdapter.setUp();
  }

  public static getInstance() : KnexWrapper {
    if(this.instance === undefined || this.instance === null) {
      this.instance = new KnexWrapper();
    }

    return this.instance;
  }
}