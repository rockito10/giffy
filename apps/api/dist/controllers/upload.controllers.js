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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadGifController = uploadGifController;
const promises_1 = __importDefault(require("node:fs/promises"));
const db_1 = require("../config/db");
// interface Gif {
// 	gif: string
// 	title: string
// 	description: string
// 	tags: string[]
// }
function uploadGifController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { file, body } = req;
        const { title, description, tags, authorId, alt, authorName } = body;
        if (!file)
            return;
        const id = `giffy-${crypto.randomUUID()}`;
        const response = yield db_1.db.gif.create({
            data: {
                id,
                title,
                images: { gif: `/apps/api/uploads/${id}.gif` },
                description,
                tags: JSON.parse(tags),
                authorName: authorName,
                authorId: authorId,
                alt,
            },
        });
        promises_1.default.rename(`./uploads/${file.originalname}`, `./uploads/${id}.gif`)
            .then(() => { })
            .catch((err) => {
            console.error('Error renaming file', err);
        });
        if (response) {
            return res.status(202).json({ message: 'Gif created' });
        }
        return res.status(500).json({ message: 'Error creating gif' });
    });
}
