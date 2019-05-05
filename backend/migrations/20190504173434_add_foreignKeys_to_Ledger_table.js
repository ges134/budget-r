exports.up = function (knex, Promise) {
  return knex.schema.alterTable('ledger', t => {
    t.integer('parentLedgerID').references('id').inTable('ledger');
    t.integer('budgetID').references('id').inTable('budget');
  })
};

exports.down = function (knex, Promise) {

};