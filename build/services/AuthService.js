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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = require("http-errors");
const DB_1 = __importDefault(require("../repository/DB"));
class AuthService {
    /**
     * Registers the users
     * @param payload the request body payload
     * @returns
     */
    static signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const emailExists = yield DB_1.default.fetchOneBy('users', 'email', email);
            if (emailExists != null) {
                throw new http_errors_1.UnprocessableEntity('User Already Exists');
            }
            const salt = process.env.APP_KEY;
            const hashedPassword = yield bcrypt_1.default.hash(password, Number(salt));
            payload.uuid = (0, uuidv4_1.uuid)();
            payload.password = hashedPassword;
            yield DB_1.default.create('users', payload);
            /*
             * I would typically have have email data sent through a message
             * queue that will trigger the email sending event here
             */
            return true;
        });
    }
    /**
     * Login user
     * @param payload the request body payload
     * @returns
     */
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield DB_1.default.fetchOneBy('users', 'email', email);
            if (user == null) {
                throw new http_errors_1.NotFound('User does not exist');
            }
            const passwordIsCorrect = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsCorrect) {
                throw new http_errors_1.Unauthorized('Incorrect password!');
            }
            if (!process.env.APP_KEY) {
                throw new http_errors_1.InternalServerError();
            }
            const token = jsonwebtoken_1.default.sign(user, process.env.APP_KEY);
            return {
                user: {
                    uuid: user.uuid,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                },
                token,
            };
        });
    }
}
exports.default = AuthService;
