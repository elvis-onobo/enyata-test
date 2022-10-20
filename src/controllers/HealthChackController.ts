import { Request, Response } from 'express'
import { successHandler } from '../helpers/successHandler'

export default class HealthCheckController {
 public static async respond(req: Request, res: Response) {
  return successHandler('Welcome to the Enyata store', 200)(req, res)
 }
}
