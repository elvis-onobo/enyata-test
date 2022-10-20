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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const successHandler_1 = require("../helpers/successHandler");
const authValidator_1 = require("../validation/authValidator");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield authValidator_1.signupValidator.validateAsync(req.body);
            const data = yield AuthService_1.default.signup(req.body);
            return (0, successHandler_1.successHandler)('Signup Successful', 200, data)(req, res);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield authValidator_1.loginValidator.validateAsync(req.body);
            const data = yield AuthService_1.default.login(req.body);
            return (0, successHandler_1.successHandler)('Login Successful', 200, data)(req, res);
        });
    }
}
exports.default = AuthController;
