"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post('/', login_controllers_1.postLogin);
