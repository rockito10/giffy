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
exports.getTrendingController = getTrendingController;
const env_1 = require("../config/env");
const gifResponseMapper_1 = require("../utils/gifResponseMapper");
function getTrendingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pos = req.headers['x-postenor'];
        // const page_n = Number(page)
        let URL = `${env_1.TENOR_API.API_BASE_URL}/featured?&key=${env_1.TENOR_API.API_KEY}&limit=${40}`;
        if (pos) {
            URL += `&pos=${pos}`;
        }
        const resp = yield fetch(URL);
        const data = yield resp.json();
        const mappedGifs = (0, gifResponseMapper_1.gifResponseMapper)(data);
        return res.status(200).json({
            gifs: mappedGifs.gifs,
            page: '1',
            pos: mappedGifs.pos,
        });
    });
}
