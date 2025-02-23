"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoutes = void 0;
const comments_controllers_1 = require("../controllers/comments.controllers");
const express_1 = require("express");
exports.commentsRoutes = (0, express_1.Router)();
exports.commentsRoutes.get('/:gifId', comments_controllers_1.getCommentsController);
exports.commentsRoutes.post('/:gifId', comments_controllers_1.sendCommentController);
exports.commentsRoutes.delete('/:gifId', comments_controllers_1.deleteCommentController);
