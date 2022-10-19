import db from '../database/db'

export default class ProductService {
 public static async fetchProducts() {
  const products = await db.select('*').from('products')
  return products
 }
}
