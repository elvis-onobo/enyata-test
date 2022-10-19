import db from '../database/db'

export default class DB {
 /**
  * Insert to database
  * @param table table to insert to
  * @param data data to insert
  * @returns
  */
 public static async create(table: string, data: Object) {
  return await db(table).insert(data)
 }

 /**
  * Gets one row of matched data from the db
  * @param table the table to query
  * @param row the row to query
  * @param value the value to query by
  * @returns
  */
 public static async fetchOneBy(table: string, row: string, value: any) {
  return await db(table).where(row, value).first()
 }

 /**
  * Fetches all data that match the value. Default pagination is 5
  * @param table
  * @param row
  * @param value
  * @param page
  * @param perPage
  * @returns
  */
 public static async fetchAll(
  table: string,
  row: string,
  value: any,
  page: number = 1,
  perPage: number = 5
 ) {
  return await db(table)
   .where(row, value)
   .leftJoin('products', 'orders.product_uuid', 'products.uuid')
   .paginate({ perPage, currentPage: page, isLengthAware: true })
 }
}
