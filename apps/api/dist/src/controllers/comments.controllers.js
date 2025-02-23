"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsController = getCommentsController;
exports.sendCommentController = sendCommentController;
exports.createGifWithComment = createGifWithComment;
exports.deleteCommentController = deleteCommentController;
const db_1 = require("../config/db");
function getCommentsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { gifId } = req.params;
        const comments = yield db_1.db.comment.findMany({
            select: {
                comment_id: true,
                gif_id: true,
                text: true,
                user: {
                    select: {
                        user_id: true,
                        avatar: true,
                        user_name: true,
                    },
                },
            },
            where: {
                gif_id: gifId,
            },
            orderBy: {
                comment_id: 'desc',
            },
        });
        if (comments) {
            const mappedComments = comments.map((comment) => {
                return Object.assign({ comment_id: comment.comment_id, gif_id: comment.gif_id, text: comment.text }, comment.user);
            });
            return res.status(200).json({ mappedComments, nextCommentId: mappedComments.length + 1 });
        }
        return res.status(404).json({ message: 'Comments not found' });
    });
}
function sendCommentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { gifId } = req.params;
        const { commentText, userId } = req.body;
        if (commentText.trim() === '') {
            return res.status(400).json({ message: 'Comment cannot be empty' });
        }
        const maxQuery = yield db_1.db.comment.aggregate({
            _max: {
                comment_id: true,
            },
            where: {
                gif_id: gifId,
            },
        });
        const nextCommentId = ((_b = (_a = maxQuery._max) === null || _a === void 0 ? void 0 : _a.comment_id) !== null && _b !== void 0 ? _b : 0) + 1;
        yield createGifWithComment(gifId, { commentText, userId, nextCommentId });
        res.status(201).json({ message: 'Comment created' });
    });
}
function createGifWithComment(gifId_1, _a) {
    return __awaiter(this, arguments, void 0, function* (gifId, { commentText, userId, nextCommentId }) {
        yield db_1.db.gif_interactions.upsert({
            where: {
                gif_id: gifId,
            },
            // Creamos el GIF si no existe
            create: {
                gif_id: gifId,
                gif_likes: 0,
                comment: {
                    create: {
                        comment_id: nextCommentId,
                        text: commentText,
                        user_id: userId,
                    },
                },
            },
            // Creamos el comentario asociado al GIF si este existe
            update: {
                comment: {
                    create: {
                        comment_id: nextCommentId,
                        text: commentText,
                        user_id: userId,
                    },
                },
            },
        });
    });
}
function deleteCommentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { gifId } = req.params;
        const { commentId, userId } = req.body;
        const response = yield db_1.db.comment.delete({
            where: {
                gif_id_user_id_comment_id: {
                    gif_id: gifId,
                    user_id: userId,
                    comment_id: commentId,
                },
            },
        });
        if (response) {
            return res.status(200).json({ message: 'Comment deleted' });
        }
        return res.status(404).json({ message: 'Comments not found' });
    });
}
