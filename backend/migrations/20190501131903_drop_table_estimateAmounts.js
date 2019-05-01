exports.up = function (knex, Promise) {
  return knex.schema.dropTable('estimateAmount')
};

exports.down = function (knex, Promise) {

};