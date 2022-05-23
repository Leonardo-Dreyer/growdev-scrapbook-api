"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const HttpErrors_1 = require("../errors/HttpErrors");
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(constants_1.HttpUnauthorizedCode)
            .json({ message: constants_1.defaultErrorMessage });
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, 'fsdfsdf232r23f23frg3g3gg4');
        const { uid } = data;
        req.userUid = uid;
        return next();
    }
    catch {
        throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpUnauthorizedCode);
    }
};
exports.authMiddleware = authMiddleware;
