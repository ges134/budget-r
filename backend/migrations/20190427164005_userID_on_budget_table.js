exports.up = function (knex, Promise) {
  return knex.schema.alterTable('budget', t => {
    t.integer('userID').references('id').inTable('user');
  })
};

exports.down = function (knex, Promise) {

};