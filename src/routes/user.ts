import { Router } from 'express';
import UserController from '../controllers/User';
import { authMiddleware, userMiddleware } from '../middlewares';
import { HttpRouter } from '../contracts';
import { UserService } from '../services';

export default class UserRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const service = new UserService();
        const controller = new UserController(service);

        routes.get('/user', authMiddleware, controller.index);
        routes.post('/user', userMiddleware, controller.store);

        return routes;
    }
}
