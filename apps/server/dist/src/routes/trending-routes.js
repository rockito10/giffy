"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trendingRoutes = void 0;
const express_1 = require("express");
const trending_controllers_1 = require("../controllers/trending.controllers");
exports.trendingRoutes = (0, express_1.Router)();
exports.trendingRoutes.get('/', trending_controllers_1.getTrendingController);
