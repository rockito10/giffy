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
exports.getUserController = getUserController;
const db_1 = require("../config/db");
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.params;
        const user = yield db_1.db.user.findUnique({
            where: { user_id: userID },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // No debería devolver la contraseña en la respuesta de la API por seguridad
        const { user_id, user_name, avatar } = user;
        return res.status(200).json({ user_id, user_name, avatar });
    });
}
