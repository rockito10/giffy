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
exports.getSearchController = getSearchController;
exports.getGifByIdController = getGifByIdController;
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const gifResponseMapper_1 = require("../utils/gifResponseMapper");
const status_1 = require("../utils/status");
// Por Query
function getSearchController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { query } = req.params;
        const { page } = req.query;
        const pos = req.headers['x-postenor'];
        const page_n = Number(page);
        const isOneWord = !query.includes(' ');
        if (!page_n)
            return next((0, status_1.BAD_REQUEST)('Missing page'));
        const dbResponse = yield db_1.db.gif.findMany({
            where: {
                title: {
                    equals: isOneWord ? query : query.split(' ')[0],
                    mode: 'insensitive',
                },
            },
            skip: 20 * (page_n - 1), // Skip the first 20 results
            take: 20 * page_n, // Take the next 20 results (items 21-40)
        });
        if (dbResponse.length >= 20)
            //skip in case of having 20 gifs in db
            return res.status(200).json({
                gifs: dbResponse,
                next: `${page_n + 1}`,
                pos: pos,
            });
        const URL = `${env_1.TENOR_API.API_BASE_URL}/search?q=${query}&key=${env_1.TENOR_API.API_KEY}&limit=${40}&pos=${pos}`;
        const resp = yield fetch(URL);
        if (resp.status === 404) {
            return next((0, status_1.BAD_REQUEST)('Error fetching Gifs'));
        }
        const data = yield resp.json();
        const mappedGifs = (0, gifResponseMapper_1.gifResponseMapper)(data);
        return res.status(200).json({
            gifs: [...dbResponse, ...mappedGifs.gifs],
            page: `${page_n + 1}`,
            pos: mappedGifs.pos,
        });
    });
}
// Por ID
function getGifByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.gifId;
        // Buscar en la base de datos
        const responseByDB = yield db_1.db.gif.findUnique({ where: { id } });
        if (responseByDB) {
            return res.status(200).json(responseByDB);
        }
        // Buscar en la API
        const URL = `${env_1.TENOR_API.API_BASE_URL}/posts?key=${env_1.TENOR_API.API_KEY}&ids=${id}`;
        const responseByTenorAPI = yield fetch(URL);
        if (responseByTenorAPI.status === 404) {
            return next();
        }
        const data = yield responseByTenorAPI.json();
        if (!data) {
            return res.status(200).json({ message: 'Gif not found' });
        }
        const rawGif = data === null || data === void 0 ? void 0 : data.results;
        if (!rawGif)
            return res.status(404).json({});
        const mappedGif = (0, gifResponseMapper_1.dataMapper)(rawGif[0]);
        return res.status(200).json(mappedGif);
    });
}
