import knex from "knex";
import KnexConfig from "../../config/knexConfig";

export default class KnexAdapter {
  public static setUp = () => {
    
    return knex({
      client: 'pg',
      connection: KnexConfig,
    });
  }
}