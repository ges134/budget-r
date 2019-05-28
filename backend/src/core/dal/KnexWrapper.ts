import Knex from 'knex';
import { knexConfig } from '../../config';

/**
 * Wraps an instance of knex with the config to allow a single call to provide the
 * necessary information.
 */
export class KnexWrapper {
  public static getKnex(): Knex {
    return Knex({
      client: 'pg',
      connection: knexConfig,
      pool: { min: 0, max: 7 }
    });
  }
}
