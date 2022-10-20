"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const OrderController_1 = __importDefault(require("./controllers/OrderController"));
const ProductController_1 = __importDefault(require("./controllers/ProductController"));
// middleware
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const router = express_1.default.Router();
exports.default = router;
router.post('/auth/signup', AuthController_1.default.signup);
router.post('/auth/login', AuthController_1.default.login);
router.get('/products/fetch', ProductController_1.default.fetchProducts);
router.post('/orders/create', authMiddleware_1.default, OrderController_1.default.createOrder);
router.get('/orders/fetch', authMiddleware_1.default, OrderController_1.default.fetchOrders);
router.get('/orders/filter', authMiddleware_1.default, OrderController_1.default.filterOrders);
