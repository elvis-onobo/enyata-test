import { Request, Response } from 'express'
import AuthService from '../services/AuthService'
import { successHandler } from '../helpers/successHandler'
import { signupValidator, loginValidator } from '../validation/authValidator'

export default class AuthController {
 public static async signup(req: Request, res: Response): Promise<Response> {
  await signupValidator.validateAsync(req.body)
  const data = await AuthService.signup(req.body)
  return successHandler('Signup Successful', 200, data)(req, res)
 }

 public static async login(req: Request, res: Response): Promise<Response> {
  await loginValidator.validateAsync(req.body)
  const data = await AuthService.login(req.body)
  return successHandler('Login Successful', 200, data)(req, res)
 }
}
