import { Request, Response } from 'express'
import { successHandler } from '../helpers/successHandler'
import ProductService from '../services/ProductService'

export default class ProductController {
 public static async fetchProducts(req: Request, res: Response) {
  const data = await ProductService.fetchProducts()
  return successHandler('Signup Successful', 200, data)(req, res)
 }
}
