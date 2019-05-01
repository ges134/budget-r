exports.up = function (knex, Promise) {
  return knex.schema.alterTable('estimate', t => {
    t.integer('effectiveMonth');
    t.decimal('amount').defaultsTo(0);
    t.dropColumn('effectiveYear');
  });
};

exports.down = function (knex, Promise) {

};