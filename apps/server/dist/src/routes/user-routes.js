"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controllers_1 = require("../controllers/user-controllers");
const express_1 = require("express");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/:userID', user_controllers_1.getUserController);
