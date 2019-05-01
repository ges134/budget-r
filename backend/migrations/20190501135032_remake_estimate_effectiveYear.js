exports.up = function (knex, Promise) {
  return knex.schema.alterTable('estimate', t => {
    t.integer('effectiveYear');
  });
};

exports.down = function (knex, Promise) {

};