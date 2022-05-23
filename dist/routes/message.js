"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = __importDefault(require("../controllers/Message"));
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const Cache_1 = require("../database/repositories/Cache");
class MessageRoutes {
    init() {
        const routes = (0, express_1.Router)();
        const service = new services_1.MessageService();
        const cacheRepository = new Cache_1.CacheRepository();
        const controller = new Message_1.default(service, cacheRepository);
        routes.get('/message', middlewares_1.authMiddleware, controller.index);
        routes.get('/message/:uid', controller.show);
        routes.post('/message', middlewares_1.authMiddleware, middlewares_1.messageValidateMiddleware, controller.store);
        routes.put('/message/:uid', middlewares_1.messageValidateMiddleware, controller.update);
        routes.delete('/message/:uid', controller.delete);
        return routes;
    }
}
exports.default = MessageRoutes;
