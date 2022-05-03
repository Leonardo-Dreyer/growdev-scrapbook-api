import { Router } from 'express';
import { HttpRouter } from '../contracts';

export default class MessageRoutes implements HttpRouter {
    init() {
        const routes = Router();

        routes.get('/', (req, res) => res.json('SCRAPBOOK-API'));

        return routes;
    }
}
