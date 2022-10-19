import { Request } from 'express'
import { userInterface } from './src/interfaces/userInterface'

declare global {
 namespace Express {
  export interface Request {
   user: userInterface
  }
 }
}
