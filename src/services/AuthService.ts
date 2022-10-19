import { uuid } from 'uuidv4'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { UnprocessableEntity, NotFound, Unauthorized, InternalServerError } from 'http-errors'
import { userInterface, loginInterface } from '../interfaces/userInterface'
import DB from '../repository/DB'

export default class AuthService {
 /**
  * Registers the users
  * @param payload the request body payload
  * @returns
  */
 public static async signup(payload: userInterface): Promise<Boolean> {
  const { email, password } = payload
  const emailExists: userInterface = await DB.fetchOneBy('users', 'email', email)

  if (emailExists != null) {
   throw new UnprocessableEntity('User Already Exists')
  }

  const salt = process.env.APP_KEY as string
  const hashedPassword = await bcrypt.hash(password, Number(salt))

  payload.uuid = uuid()
  payload.password = hashedPassword
  await DB.create('users', payload)

  /*
   * I would typically have have email data sent through a message
   * queue that will trigger the email sending event here
   */
  return true
 }

 /**
  * Login user
  * @param payload the request body payload
  * @returns
  */
 public static async login(payload: loginInterface): Promise<Object> {
  const { email, password } = payload

  const user: userInterface = await DB.fetchOneBy('users', 'email', email)

  if (user == null) {
   throw new NotFound('User does not exist')
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password)

  if (!passwordIsCorrect) {
   throw new Unauthorized('Incorrect password!')
  }

  if (!process.env.APP_KEY) {
   throw new InternalServerError()
  }

  const token = jsonwebtoken.sign(user, process.env.APP_KEY)

  return {
   user: {
    uuid: user.uuid,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
   },
   token,
  }
 }
}
