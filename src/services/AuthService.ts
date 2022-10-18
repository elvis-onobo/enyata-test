import { uuid } from 'uuidv4'
import bcrypt from 'bcrypt'
import { UnprocessableEntity } from 'http-errors'
import { userInterface } from '../interfaces/userInterface'
import DB from '../repository/DB'

export default class AuthService {
 public static async signup(payload: userInterface): Promise<Boolean> {
  const { first_name, last_name, email, password } = payload
  const emailExists: userInterface = await DB.fetchOneBy('users', 'email', email)

  if (emailExists != null) {
    throw new UnprocessableEntity('User Already Exists')
   }
   const salt = process.env.APP_KEY as string
   const hashedPassword = await bcrypt.hash(password, Number(salt))
  payload.uuid = uuid()
  payload.password = hashedPassword
  await DB.create('users', payload)
  return true
 }
}
