"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
class AuthController {
    constructor(service, cacheRepository) {
        this.service = service;
        this.cacheRepository = cacheRepository;
        this.authentication = async (req, res) => {
            const { email, password } = req.body;
            const user = await this.service.findOne(email);
            await this.cacheRepository.delete('message:all');
            if (!user) {
                return res
                    .status(constants_1.HttpUnauthorizedCode)
                    .json({ message: constants_1.invalidUser });
            }
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res
                    .status(constants_1.HttpUnauthorizedCode)
                    .json({ message: constants_1.invalidPassword });
            }
            const token = jsonwebtoken_1.default.sign({ uid: user.uid }, 'fsdfsdf232r23f23frg3g3gg4', {
                expiresIn: '1d'
            });
            return res.json({
                user,
                token
            });
        };
    }
}
exports.default = AuthController;
