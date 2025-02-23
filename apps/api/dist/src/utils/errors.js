"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestError = badRequestError;
exports.notFoundError = notFoundError;
exports.internalServerError = internalServerError;
function createError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}
// CLIENT ERRORS: 400-499
function badRequestError(message = 'Bad Request') {
    return createError(400, message);
}
function notFoundError(message = 'Not Found') {
    return createError(404, message);
}
// SERVER ERRORS: 500-599
function internalServerError(message = 'Internal Server Error') {
    return createError(500, message);
}
