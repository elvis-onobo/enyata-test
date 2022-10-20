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
const db_1 = __importDefault(require("../database/db"));
class DB {
    /**
     * Insert to database
     * @param table table to insert to
     * @param data data to insert
     * @returns
     */
    static create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(table).insert(data);
        });
    }
    /**
     * Gets one row of matched data from the db
     * @param table the table to query
     * @param row the row to query
     * @param value the value to query by
     * @returns
     */
    static fetchOneBy(table, row, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(table).where(row, value).first();
        });
    }
    /**
     * Fetches all data that match the value. Default pagination is 5
     * @param table
     * @param row
     * @param value
     * @param page
     * @param perPage
     * @returns
     */
    static fetchAll(table, row, value, page = 1, perPage = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(table)
                .where(row, value)
                .leftJoin('products', 'orders.product_uuid', 'products.uuid')
                .paginate({ perPage, currentPage: page, isLengthAware: true });
        });
    }
}
exports.default = DB;
