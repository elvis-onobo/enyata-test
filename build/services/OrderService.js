"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const DB_1 = __importDefault(require("../repository/DB"));
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../database/db"));
class OrderService {
    /**
     * Creates an order
     * @param userUuid
     * @param productUuid
     * @returns
     */
    static createOrder(userUuid, productUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const productExists = yield DB_1.default.fetchOneBy('products', 'uuid', productUuid);
            if (productExists == null) {
                throw new http_errors_1.BadRequest('Invalid product');
            }
            yield DB_1.default.create('orders', { uuid: (0, uuidv4_1.uuid)(), user_uuid: userUuid, product_uuid: productUuid });
            return true;
        });
    }
    /**
     * Fetch all orders for a user
     * @param userUuid
     * @returns
     */
    static fetchOrders(userUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield DB_1.default.fetchAll('orders', 'user_uuid', userUuid);
            return orders;
        });
    }
    /**
     * Fetches all orders for a user and filters therm when required
     * @param userUuid
     * @param from
     * @param to
     * @param order
     * @param page
     * @param perPage
     * @returns
     */
    static filterOrders(userUuid, minPrice, maxPrice, order = 'desc', page = 1, perPage = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield db_1.default
                .select('*')
                .from('orders')
                .where('user_uuid', userUuid)
                .leftJoin('products', 'orders.product_uuid', 'products.uuid')
                .whereBetween('products.product_price', [minPrice, maxPrice])
                .orderBy('products.product_price', order)
                .paginate({ perPage, currentPage: page, isLengthAware: true });
            return orders;
        });
    }
}
exports.default = OrderService;
