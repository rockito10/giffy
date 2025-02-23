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
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const db_1 = require("./src/config/db");
const multer_middleware_1 = require("./src/middlewares/multer.middleware");
const app_routes_1 = require("./src/routes/app-routes");
// APP
const app = (0, express_1.default)();
// PRE-MIDDLEWARES
app.use((0, cors_1.default)());
app.use((0, express_2.json)()); // JSON es un middleware que parsea el body de las peticiones a JSON
// ROUTES
app.use('/api', app_routes_1.giffyApiRouter);
// Ruta para servir imágenes estáticas
app.get('/api/images/:gifId', (req, res) => {
    const { gifId } = req.params;
    const imagePath = node_path_1.default.join(process.cwd(), 'public/images', `${gifId}.gif`);
    // Verificar si la imagen existe antes de enviarla
    if (node_fs_1.default.existsSync(imagePath)) {
        res.sendFile(imagePath);
    }
    else {
        res.status(404).json({ error: 'Gif not found' });
    }
});
app.post('/api/upload', multer_middleware_1.multerMiddleware, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { file, body } = req;
    const { title, description, tags, authorName, authorId, alt } = body;
    if (!file)
        return;
    const id = `giffy-${crypto.randomUUID()}`;
    const response = yield db_1.db.gif.create({
        data: {
            id,
            title,
            images: { gif: `/api/images/${id}` },
            description,
            tags: JSON.parse(tags),
            authorName,
            authorId,
            alt,
        },
    });
    promises_1.default
        .rename(`./public/images/${file.originalname}`, `./public/images/${id}.gif`)
        .then(() => {
        // console.log('File renamed')
    })
        .catch((err) => {
        console.error('Error renaming file', err);
    });
    if (response) {
        return res.status(202).json({ message: 'Gif created', id });
    }
    return res.status(500).json({ message: 'Error creating gif' });
}));
// POST-MIDDLEWARES
// NOTHING HERE
// SERVER
// const port = 3000
// app.listen(port, () => {})
// ------------------------------------------------
