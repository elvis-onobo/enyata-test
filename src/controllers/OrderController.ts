import { Request, Response } from 'express'
import OrderService from '../services/OrderService'
import { successHandler } from '../helpers/successHandler'
import {
 createOrderValidator,
 filterOrderValidator,
 fetchOrderValidator,
} from '../validation/orderValidator'

export default class OrderController {
 public static async createOrder(req: Request, res: Response) {
  await createOrderValidator.validateAsync(req.query)
  const { user } = req
  const products = req.body
  const data = await OrderService.createOrder(user.uuid, products)
  return successHandler('Order placed successfully', 200, data)(req, res)
 }

 public static async fetchOrders(req: Request, res: Response) {
  await fetchOrderValidator.validateAsync(req.query)
  const { page, perPage } = req.query
  const data = await OrderService.fetchOrders(
   req.user.uuid,
   page as unknown as number,
   perPage as unknown as number
  )
  return successHandler('Order fetched successfully', 200, data)(req, res)
 }

 public static async filterOrders(req: Request, res: Response) {
  await filterOrderValidator.validateAsync(req.query)
  const { minPrice, maxPrice, order, page, perPage } = req.query
  const data = await OrderService.filterOrders(
   req.user.uuid,
   minPrice as unknown as number,
   maxPrice as unknown as number,
   order as unknown as string,
   page as unknown as number,
   perPage as unknown as number
  )
  return successHandler('Order filtered successfully', 200, data)(req, res)
 }
}
