
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budget', (t) => {
    t.increments('id').primary();
    t.timestamp('startDate').defaultTo(knex.fn.now());
    t.foreign('userId').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
