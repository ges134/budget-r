import knex from 'knex';
import { knexConfig } from '../../config';

export default class KnexAdapter {
  public static setUp = () =>
    knex({
      client: 'pg',
      connection: knexConfig,
      pool: { min: 0, max: 7 }
    });
}
