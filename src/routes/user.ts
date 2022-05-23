import { Router } from 'express';
import UserController from '../controllers/User';
import { authMiddleware, userValidateMiddleware } from '../middlewares';
import { HttpRouter } from '../contracts';
import { UserService } from '../services';

export default class UserRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const service = new UserService();
        const controller = new UserController(service);

        routes.get('/user', authMiddleware, controller.index);
        routes.post('/user', userValidateMiddleware, controller.store);

        return routes;
    }
}
