import { Router } from 'express';
import { HttpRouter } from '../contracts';
import AuthController from '../controllers/Authentication';

export default class AuthRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const controller = new AuthController();

        routes.post('/auth', controller.authentication);

        return routes;
    }
}
