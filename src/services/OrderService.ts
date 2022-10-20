import { uuid } from 'uuidv4'
import DB from '../repository/DB'
import { BadRequest } from 'http-errors'
import db from '../database/db'
import { createOrderInterface } from '../interfaces/orderInterface'

export default class OrderService {
 /**
  * Creates an order
  * @param userUuid
  * @param productUuid
  * @returns
  */
 public static async createOrder(
  userUuid: string,
  data: { [products: string]: Array<string> }
 ): Promise<Boolean> {
  const orderCode = uuid()
  const productExists = await db.select('*').from('products').whereIn('uuid', data.products)

  let order: Array<createOrderInterface> = []
  productExists.map((product) => {
   order.push({
    uuid: uuid(),
    user_uuid: userUuid,
    product_uuid: product.uuid,
    order_code: orderCode,
    product_price: product.product_price,
    product_name: product.product_name,
   })
  })

  await DB.create('orders', order)
  return true
 }

 /**
  * Fetch all orders for a user
  * @param userUuid
  * @returns
  */
 public static async fetchOrders(userUuid: string, page: number = 1, perPage: number = 5) {
  // orders should be immutable, therefore save the price and order name
  const orders = await db
   .select('*')
   .from('orders')
   .where('user_uuid', userUuid)
   //    .leftJoin('products', 'orders.product_uuid', 'products.uuid')
   .groupBy('orders.order_code', 'orders.id')
   .paginate({ perPage, currentPage: page, isLengthAware: true })

  return orders
 }

 /**
  * Fetches all orders for a user and filters therm when required
  * @param userUuid
  * @param from
  * @param to
  * @param order
  * @param page
  * @param perPage
  * @returns
  */
 public static async filterOrders(
  userUuid: string,
  minPrice: number,
  maxPrice: number,
  order = 'desc',
  page: number = 1,
  perPage: number = 5
 ) {
  const orders = await db
   .select('*')
   .from('orders')
   .where('user_uuid', userUuid)
   .leftJoin('products', 'orders.product_uuid', 'products.uuid')
   .whereBetween('products.product_price', [minPrice, maxPrice])
   .orderBy('products.product_price', order)
   .paginate({ perPage, currentPage: page, isLengthAware: true })

  return orders
 }
}
