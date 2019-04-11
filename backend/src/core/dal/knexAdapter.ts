import knex from 'knex';
import KnexConfig from '../../config/knexConfig';

export default class KnexAdapter {
  public static setUp = () =>
    knex({
      client: 'pg',
      connection: KnexConfig,
      pool: { min: 0, max: 7 }
    });
}
