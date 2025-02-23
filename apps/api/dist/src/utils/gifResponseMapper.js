"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gifResponseMapper = gifResponseMapper;
exports.tenorResponseMapper = tenorResponseMapper;
exports.dataMapper = dataMapper;
function gifResponseMapper(response) {
    return {
        gifs: response.results.map((gif) => dataMapper(gif)),
        pos: response.next,
        page: 1,
    };
}
function tenorResponseMapper(response) {
    return {
        gifs: response.map((gif) => dataMapper(gif)),
        page: 1,
        pos: '',
    };
}
// GIF
function dataMapper(data) {
    var _a, _b, _c, _d;
    return {
        alt: data.content_description,
        // original: data.media_formats.gif.url,
        id: data.id,
        images: {
            gif: (_a = data.media_formats.gif) === null || _a === void 0 ? void 0 : _a.url,
            mp4: (_b = data.media_formats.mp4) === null || _b === void 0 ? void 0 : _b.url,
            tinygif: (_c = data.media_formats.tinygif) === null || _c === void 0 ? void 0 : _c.url,
            webp: (_d = data.media_formats.webp) === null || _d === void 0 ? void 0 : _d.url,
        },
        tags: data.tags,
        title: data.title,
        authorId: '',
        authorName: '',
        description: '',
    };
}
