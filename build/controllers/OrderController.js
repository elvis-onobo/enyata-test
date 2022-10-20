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
const OrderService_1 = __importDefault(require("../services/OrderService"));
const successHandler_1 = require("../helpers/successHandler");
const orderValidator_1 = require("../validation/orderValidator");
class OrderController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderValidator_1.createOrderValidator.validateAsync(req.query);
            const { user } = req;
            const productUuid = req.query.product;
            const data = yield OrderService_1.default.createOrder(user.uuid, productUuid);
            return (0, successHandler_1.successHandler)('Order placed successfully', 200, data)(req, res);
        });
    }
    static fetchOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield OrderService_1.default.fetchOrders(req.user.uuid);
            return (0, successHandler_1.successHandler)('Order fetched successfully', 200, data)(req, res);
        });
    }
    static filterOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderValidator_1.filterOrderValidator.validateAsync(req.query);
            const { minPrice, maxPrice, order, page, perPage } = req.query;
            const data = yield OrderService_1.default.filterOrders(req.user.uuid, minPrice, maxPrice, order, page, perPage);
            return (0, successHandler_1.successHandler)('Order filtered successfully', 200, data)(req, res);
        });
    }
}
exports.default = OrderController;
