"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MessageRoutes {
    init() {
        const routes = (0, express_1.Router)();
        routes.get('/', (req, res) => res.json('SCRAPBOOK-API'));
        return routes;
    }
}
exports.default = MessageRoutes;
