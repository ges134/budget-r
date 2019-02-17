
exports.up = function(knex, Promise) {
  return knex.schema.createTable('account', (t) => {
    t.increments('id').primary();
    t.decimal('initialAmount').defaultTo(0);
    t.string('accountName').notNullable();
    t.foreign('userID').references('id');
  });
};

exports.down = function(knex, Promise) {
  
};
