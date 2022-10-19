import express from 'express'
import AuthController from './controllers/AuthController'
import OrderController from './controllers/OrderController'
// middleware
import authMiddleware from './middleware/authMiddleware'

const router = express.Router()
export default router

router.post('/auth/signup', AuthController.signup)
router.post('/auth/login', AuthController.login)
router.post('/orders/create', authMiddleware, OrderController.createOrder)
