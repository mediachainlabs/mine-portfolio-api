import {
  createTable,
  addCIText,
  addForeignKey,
} from '../app/util/migrations';

const tables = [
  {
    name: 'users',
    config: (knex, table) => {
      addCIText(table, 'username').index().notNullable().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    }
  },
  {
    name: 'images',
    config: (knex, table) => {
      table.text('image_url').notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      addForeignKey(table, 'user_id', 'users');
    }
  },
];

export const up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "citext"');

  for (let table of tables) {
    await createTable(knex, table.name);
    await knex.schema.table(table.name, table.config.bind(null, knex));
  }
};

export const down = async (knex) => {
  for (let {name} of tables.reverse()) {
    await knex.schema.dropTableIfExists(name);
  }
};
