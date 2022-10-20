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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('products').del();
        //  Inserts seed entries
        yield knex('products').insert([
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Louis Vuitton Short',
                product_price: 1000,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Louis Vuitton Shirt',
                product_price: 1200,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Louis Vuitton Shoes',
                product_price: 1500,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Jordans',
                product_price: 1100,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Nike Shoes',
                product_price: 1200,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'programming course',
                product_price: 150,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Jordans joggers',
                product_price: 1200,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Nike Jacket',
                product_price: 500,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Running shoes',
                product_price: 150,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Leather snickers',
                product_price: 800,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Michael Jackson Shoes',
                product_price: 150,
            },
            {
                uuid: (0, uuid_1.v4)(),
                product_name: 'Slim Shady Shirts',
                product_price: 800,
            },
        ]);
    });
}
exports.seed = seed;
