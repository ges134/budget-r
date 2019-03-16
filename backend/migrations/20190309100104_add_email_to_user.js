
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user', t => {
    t.string('email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  
};
