import { Router } from 'express';
import UserController from '../controllers/User';
import { authMiddleware, userValidateMiddleware } from '../middlewares';
import { HttpRouter } from '../contracts';

export default class UserRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const controller = new UserController();

        routes.get('/user', authMiddleware, controller.index);
        routes.post('/user', userValidateMiddleware, controller.store);

        return routes;
    }
}
