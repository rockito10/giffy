"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giffyApiRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./user-routes");
//
exports.giffyApiRouter = express_1.default.Router();
exports.giffyApiRouter.get('/', (_req, res) => {
    res.json({ message: 'Giffy API Online' });
});
exports.giffyApiRouter.use('/user', user_routes_1.userRoutes);
// giffyApiRouter.use('/search', searchRoutes)
// giffyApiRouter.use('/comments', commentsRoutes)
// giffyApiRouter.use('/likes', likesRoutes)
// giffyApiRouter.use('/auth/login', authRoutes)
// giffyApiRouter.use('/trending', trendingRoutes)
