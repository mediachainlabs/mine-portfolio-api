export function createTable(knex, table) {
  return knex.schema.raw(`create table ${table} (id uuid primary key default uuid_generate_v1mc());`);
}

export function addCIText(table, columnName) {
  return table.specificType(columnName, 'CITEXT');
}

export function addForeignKey(
  table,
  columnName,
  tableName,
  nullable) {
  const col = table.uuid(columnName)
    .references('id')
    .inTable(tableName);
  return nullable ? col : col.notNullable();
}

