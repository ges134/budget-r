import knex from "knex";
import KnexConfig from "../../config/knexConfig";

export default class KnexAdapter {
  static setUp = () => {
    
    return knex({
      client: 'pg',
      connection: KnexConfig,
    });
  }
}