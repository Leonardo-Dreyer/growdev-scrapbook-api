"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../controllers/User"));
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
class UserRoutes {
    init() {
        const routes = (0, express_1.Router)();
        const service = new services_1.UserService();
        const controller = new User_1.default(service);
        routes.get('/user', middlewares_1.authMiddleware, controller.index);
        routes.post('/user', middlewares_1.userValidateMiddleware, controller.store);
        return routes;
    }
}
exports.default = UserRoutes;
