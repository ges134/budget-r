
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ledger', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.foreign('parentLedgerID').references('id');
    t.foreign('budgetID').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
