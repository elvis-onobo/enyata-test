import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
 // Deletes ALL existing entries
 await knex('products').del()

 //  Inserts seed entries
 await knex('products').insert([
  {
   uuid: uuidv4(),
   product_name: 'Louis Vuitton Short',
   product_price: 1000,
  },
  {
   uuid: uuidv4(),
   product_name: 'Louis Vuitton Shirt',
   product_price: 1200,
  },
  {
   uuid: uuidv4(),
   product_name: 'Louis Vuitton Shoes',
   product_price: 1500,
  },
  {
   uuid: uuidv4(),
   product_name: 'Jordans',
   product_price: 1100,
  },
  {
   uuid: uuidv4(),
   product_name: 'Nike Shoes',
   product_price: 1200,
  },
  {
   uuid: uuidv4(),
   product_name: 'programming course',
   product_price: 150,
  },
  {
   uuid: uuidv4(),
   product_name: 'Jordans joggers',
   product_price: 1200,
  },
  {
   uuid: uuidv4(),
   product_name: 'Nike Jacket',
   product_price: 500,
  },
  {
   uuid: uuidv4(),
   product_name: 'Running shoes',
   product_price: 150,
  },
  {
   uuid: uuidv4(),
   product_name: 'Leather snickers',
   product_price: 800,
  },
  {
   uuid: uuidv4(),
   product_name: 'Michael Jackson Shoes',
   product_price: 150,
  },
  {
   uuid: uuidv4(),
   product_name: 'Slim Shady Shirts',
   product_price: 800,
  },
 ])
}
