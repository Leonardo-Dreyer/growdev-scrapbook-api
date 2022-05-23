"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const HttpErrors_1 = require("../errors/HttpErrors");
class UserController {
    constructor(service) {
        this.service = service;
        this.index = async (req, res) => {
            return res.sendStatus(200);
        };
        this.store = async (req, res) => {
            const uid = (0, uuid_1.v4)();
            const { email, password } = req.body;
            const user = await this.service.findOne(email);
            if (user) {
                return res.status(constants_1.HttpBadRequestCode).json({
                    message: 'Email já cadastrado, tente um email diferente!'
                });
            }
            const dto = {
                uid,
                email,
                password
            };
            try {
                await this.service.create(dto);
                return res.sendStatus(201);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
    }
}
exports.default = UserController;
