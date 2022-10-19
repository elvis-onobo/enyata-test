import { uuid } from 'uuidv4'
import DB from '../repository/DB'
import { BadRequest } from 'http-errors'

export default class OrderService {
 public static async createOrder(userUuid: string, productUuid: string) {
  const productExists = await DB.fetchOneBy('products', 'uuid', productUuid)

  if (productExists == null) {
   throw new BadRequest('Invalid product')
  }

  await DB.create('orders', { uuid: uuid(), user_uuid: userUuid, product_uuid: productUuid })
  return true
 }
}
