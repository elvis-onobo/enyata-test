import { uuid } from 'uuidv4'
import DB from '../repository/DB'
import { BadRequest } from 'http-errors'
import db from '../database/db'

export default class OrderService {
 /**
  * Creates an order
  * @param userUuid
  * @param productUuid
  * @returns
  */
 public static async createOrder(userUuid: string, productUuid: string): Promise<Boolean> {
  const productExists = await DB.fetchOneBy('products', 'uuid', productUuid)

  if (productExists == null) {
   throw new BadRequest('Invalid product')
  }

  await DB.create('orders', { uuid: uuid(), user_uuid: userUuid, product_uuid: productUuid })
  return true
 }

 /**
  * Fetch all orders for a user
  * @param userUuid
  * @returns
  */
 public static async fetchOrders(userUuid: string) {
  const orders = await DB.fetchAll('orders', 'user_uuid', userUuid)
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
