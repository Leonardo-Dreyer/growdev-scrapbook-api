"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidateMiddleware = void 0;
const constants_1 = require("../constants");
const services_1 = require("../services");
const userValidateMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    const userService = new services_1.UserService();
    if (!email || !password) {
        return res.status(constants_1.HttpBadRequestCode).json({
            message: 'Preencha todos os campos!'
        });
    }
    else if (password.length < 4) {
        return res.status(constants_1.HttpBadRequestCode).json({
            message: 'Senha incorreta, deve conter mais de 4 dígitos!'
        });
    }
    next();
};
exports.userValidateMiddleware = userValidateMiddleware;
