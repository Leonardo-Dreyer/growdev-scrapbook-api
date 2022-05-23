"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const HttpErrors_1 = require("../errors/HttpErrors");
class MessageController {
    constructor(service, cacheRepository) {
        this.service = service;
        this.cacheRepository = cacheRepository;
        this.index = async (req, res) => {
            const userUid = req.userUid;
            try {
                const cache = await this.cacheRepository.find('message:all');
                if (cache) {
                    return res.json(cache);
                }
                const messages = await this.service.find(userUid);
                const json = messages.map((message) => {
                    return {
                        uid: message.uid,
                        description: message.description,
                        detailing: message.detailing
                    };
                });
                await this.cacheRepository.save('message:all', json);
                return res.json(messages);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
        this.show = async (req, res) => {
            const { uid } = req.params;
            try {
                const cache = await this.cacheRepository.find(`message:${uid}`);
                if (cache) {
                    return res.status(200).json(cache);
                }
                const message = await this.service.findOne(uid);
                return res.status(200).json(message);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
        this.store = async (req, res) => {
            const uid = (0, uuid_1.v4)();
            const userUid = req.userUid;
            const { description, detailing } = req.body;
            const dto = {
                uid,
                description,
                detailing,
                userUid
            };
            try {
                await this.cacheRepository.delete('message:all');
                const message = await this.service.create(dto);
                await this.cacheRepository.save(`message:${message.uid}`, message);
                return res.status(200).json(message);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
        this.update = async (req, res) => {
            const { uid } = req.params;
            const { description, detailing, userUid } = req.body;
            const dto = {
                uid,
                description,
                detailing,
                userUid
            };
            try {
                await this.cacheRepository.delete(`message:${uid}`);
                await this.cacheRepository.delete('message:all');
                const message = await this.service.update(dto);
                await this.cacheRepository.save(`message:${uid}`, message);
                return res.status(200).json(message);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
        this.delete = async (req, res) => {
            const { uid } = req.params;
            try {
                await this.cacheRepository.delete('message:all');
                await this.cacheRepository.delete(`message:${uid}`);
                await this.service.delete(uid);
                return res.sendStatus(204);
            }
            catch {
                throw new HttpErrors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
            }
        };
    }
}
exports.default = MessageController;
