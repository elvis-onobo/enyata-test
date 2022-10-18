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
}
