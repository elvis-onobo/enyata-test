import { Request, Response } from 'express'
import OrderService from '../services/OrderService'
import { successHandler } from '../helpers/successHandler'
import { createOrderValidator } from '../validation/orderValidator'

export default class OrderController {
 public static async createOrder(req: Request, res: Response) {
  await createOrderValidator.validateAsync(req.query)
  const { user } = req
  const productUuid = req.query.product as string
  const data = await OrderService.createOrder(user.uuid, productUuid)
  return successHandler('Order placed successfully', 200, data)(req, res)
 }
}
