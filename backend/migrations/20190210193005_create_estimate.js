
exports.up = function(knex, Promise) {
  return knex.schema.createTable('estimate', t => {
    t.increments('id').primary();
    t.timestamp('effectiveYear').defaultsTo(knex.fn.now());
    t.foreign('ledgerID').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
