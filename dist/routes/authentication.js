"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authentication_1 = __importDefault(require("../controllers/Authentication"));
const Cache_1 = require("../database/repositories/Cache");
const services_1 = require("../services");
class AuthRoutes {
    init() {
        const routes = (0, express_1.Router)();
        const service = new services_1.UserService();
        const cacheRepository = new Cache_1.CacheRepository();
        const controller = new Authentication_1.default(service, cacheRepository);
        routes.post('/auth', controller.authentication);
        return routes;
    }
}
exports.default = AuthRoutes;
