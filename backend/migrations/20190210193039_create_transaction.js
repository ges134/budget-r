
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transaction', t => {
    t.increments('id').primary();
    t.decimal('amount').notNullable();
    t.timestamp('effectiveDate').defaultsTo(knex.fn.now());
    t.string('description');
    t.foreign('accountID').references('id');
    t.foreign('ledgerID').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
