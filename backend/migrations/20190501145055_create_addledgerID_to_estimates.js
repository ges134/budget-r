exports.up = function (knex, Promise) {
  return knex.schema.alterTable('estimate', t => {
    t.integer('ledgerID').references('id').inTable('ledger');
  })
};

exports.down = function (knex, Promise) {

};