"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
// import logger from '../helpers/logger'
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    console.log('errror >>>> ', err);
    // logger.error(err)
    const message = err.message || "There's a problem from our end. We are working to fix this.";
    res.header('Content-Type', 'application/json');
    res.status(status).json({
        success: false,
        status,
        message,
    });
};
exports.errorMiddleware = errorMiddleware;
