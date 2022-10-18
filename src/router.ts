import express from 'express'
import AuthController from './controllers/AuthController'

const router = express.Router()
export default router

router.post('/auth/signup', AuthController.signup)
