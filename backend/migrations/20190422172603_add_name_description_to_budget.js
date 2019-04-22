exports.up = function (knex, Promise) {
  return knex.schema.alterTable('budget', t => {
    t.string('name').notNullable();
    t.string('description').notNullable();
  })
};

exports.down = function (knex, Promise) {

};