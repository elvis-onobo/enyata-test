"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOrderValidator = exports.createOrderValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const orderEnum_1 = require("../enums/orderEnum");
exports.createOrderValidator = joi_1.default.object({
    product: joi_1.default.string().min(10).required(),
});
exports.filterOrderValidator = joi_1.default.object({
    minPrice: joi_1.default.number().min(100).required(),
    maxPrice: joi_1.default.number().min(100).required(),
    order: joi_1.default.string()
        .valid(...Object.values(orderEnum_1.filterOrderEnum))
        .optional(),
    page: joi_1.default.number().min(1).optional(),
    perPage: joi_1.default.number().min(5).max(25).optional(),
});
