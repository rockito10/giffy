"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_OK = STATUS_OK;
exports.BAD_REQUEST = BAD_REQUEST;
exports.NOT_FOUND = NOT_FOUND;
exports.INTERNAL_SERVER_ERROR = INTERNAL_SERVER_ERROR;
// SUCCESS: 200-299 ------------------------------------
function STATUS_OK() {
    return { statusCode: 200, message: 'OK' };
}
// CLIENT ERRORS: 400-499 ------------------------------
function BAD_REQUEST(message = 'Bad Request') {
    return { statusCode: 400, message };
}
function NOT_FOUND(message = 'Not Found') {
    return { statusCode: 404, message };
}
// SERVER ERRORS: 500-599 ------------------------------
function INTERNAL_SERVER_ERROR(message = 'Internal Server Error') {
    return { statusCode: 500, message };
}
