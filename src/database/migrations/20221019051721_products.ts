import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
 return knex.schema.createTable('products', (table: Knex.TableBuilder) => {
  table.increments('id', { primaryKey: true })
  table.uuid('uuid').notNullable().unique()
  table.string('product_name').notNullable()
  table.decimal('product_price', 12, 2).notNullable()
  table.timestamps(true, true)
 })
}

export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTable('products')
}
