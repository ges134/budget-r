
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (t) => {
    t.increments('id').primary();
    t.string('username').notNullable();
    t.string('password').notNullable();
    t.unique('username');
  });
};

exports.down = function(knex, Promise) {
  
};
