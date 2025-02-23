"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const search_controllers_1 = require("../controllers/search.controllers");
const express_1 = require("express");
exports.searchRoutes = (0, express_1.Router)();
exports.searchRoutes.get('/:query', search_controllers_1.getSearchController);
exports.searchRoutes.get('/gif/:gifId', search_controllers_1.getGifByIdController);
