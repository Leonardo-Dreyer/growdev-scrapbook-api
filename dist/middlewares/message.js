"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidateMiddleware = void 0;
const constants_1 = require("../constants");
const messageValidateMiddleware = (req, res, next) => {
    const { description, detailing } = req.body;
    if (!description || !detailing) {
        return res.status(constants_1.HttpBadRequestCode).json({
            message: (0, constants_1.invalidField)('Recado')
        });
    }
    next();
};
exports.messageValidateMiddleware = messageValidateMiddleware;
