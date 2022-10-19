import { uuid } from 'uuidv4'
import DB from '../repository/DB'
import { BadRequest } from 'http-errors'

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

 public static async fetchOrders(userUuid: string) {
  const orders = await DB.fetchAll('orders', 'user_uuid', userUuid)
  return orders
 }
}
