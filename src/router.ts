import express from 'express'
import HealthCheckController from './controllers/HealthChackController'
import AuthController from './controllers/AuthController'
import OrderController from './controllers/OrderController'
import ProductController from './controllers/ProductController'
// middleware
import authMiddleware from './middleware/authMiddleware'

const router = express.Router()
export default router

router.get('/', HealthCheckController.respond)
router.post('/auth/signup', AuthController.signup)
router.post('/auth/login', AuthController.login)
router.get('/products/fetch', ProductController.fetchProducts)
router.post('/orders/create', authMiddleware, OrderController.createOrder)
router.get('/orders/fetch', authMiddleware, OrderController.fetchOrders)
router.get('/orders/filter', authMiddleware, OrderController.filterOrders)
