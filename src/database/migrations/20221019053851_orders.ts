import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
 return knex.schema.createTable('orders', (table: Knex.TableBuilder) => {
  table.increments('id', { primaryKey: true })
  table.uuid('uuid').notNullable().unique()
  table.uuid('user_uuid').references('uuid').inTable('users').notNullable()
  table.uuid('product_uuid').references('uuid').inTable('products').notNullable()
  table.string('product_name').notNullable()
  table.decimal('product_price', 12, 2).notNullable()
  table.uuid('order_code').notNullable()
  table.timestamps(true, true)
 })
}

export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTable('orders')
}
