
exports.up = function(knex, Promise) {
  return knex.schema.createTable('estimateAmount', t => {
    t.increments('id').primary();
    t.timestamp('effectiveMonth').defaultsTo(knex.fn.now());
    t.decimal('amount').defaultsTo(0);
    t.foreign('estimatid').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
