"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const upload_controllers_1 = require("../controllers/upload.controllers");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const express_1 = require("express");
const user_routes_1 = require("./user-routes");
exports.uploadRoutes = (0, express_1.Router)();
user_routes_1.userRoutes.post('/', multer_middleware_1.multerMiddleware, upload_controllers_1.uploadGifController);
