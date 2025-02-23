"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesRoutes = void 0;
const likes_controllers_1 = require("../controllers/likes.controllers");
const express_1 = require("express");
exports.likesRoutes = (0, express_1.Router)();
exports.likesRoutes.get('/:gifId', likes_controllers_1.getLikes);
exports.likesRoutes.post('/:gifId', likes_controllers_1.postLikes);
exports.likesRoutes.get('/user/:userID', likes_controllers_1.getLikedGifs);
