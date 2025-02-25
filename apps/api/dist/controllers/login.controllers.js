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
exports.postLogin = postLogin;
const db_1 = require("../config/db");
function postLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield db_1.db.user.findUnique({
            where: {
                user_name: username,
            },
        });
        // Invalid credentials
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.avatar) {
            return res.status(400).json({ message: 'Failed to login' });
        }
        const loginInfo = {
            username: user.user_name,
            avatar: user.avatar,
            id: user.user_id,
        };
        res.status(200).json({
            message: 'Login successful',
            data: loginInfo,
        });
    });
}
