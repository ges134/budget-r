
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (t) => {
    t.increments('eID').primary();
    t.string('username').notNullable();
    t.string('password').notNullable();
    t.unique('username');
  });

  return knex.schema.createTable('account', (t) => {
    t.increments('eID').primary();
    t.decimal('initialAmount').defaultTo(0);
    t.accountName('accountName').notNullable();
    t.foreign('userID').references('user.eID');
  });

  return knex.schema.createTable('budget', (t) => {
    t.increments('eID').primary();
    t.timestamp('startDate').defaultTo(knex.fn.now());
    t.foreign('userId').references('user.eID');
  });

  return knex.schema.createTable('ledger', t => {
    t.increments('eID').primary();
    t.string('name').notNullable();
    t.foreign('parentLedgerID').references('ledger.eID');
    t.foreign('budgetID').references('budget.eID');
  });

  return knex.schema.createTable('estimate', t => {
    t.increments('eID').primary();
    t.timestamp('effectiveYear').defaultsTo(knex.fn.now());
    t.foreign('ledgerID').references('ledger.eID');
  });

  return knex.schema.createTable('estimateAmount', t => {
    t.increments('eID').primary();
    t.timestamp('effectiveMonth').defaultsTo(knex.fn.now());
    t.decimal('amount').defaultsTo(0);
    t.foreign('estimateID').references('estimate.eID');
  });

  return knex.schema.createTable('transaction', t => {
    t.increments('eID').primary();
    t.decimal('amount').notNullable();
    t.timestamp('effectiveDate').defaultsTo(knex.fn.now());
    t.string('description');
    t.foreign('accountID').references('account.eID');
    t.foreign('ledgerID').references('ledger.eID');
  });
};

exports.down = function(knex, Promise) {
  
};
