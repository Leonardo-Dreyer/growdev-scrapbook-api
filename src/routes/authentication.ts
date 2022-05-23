import { Router } from 'express';
import { HttpRouter } from '../contracts';
import AuthController from '../controllers/Authentication';
import { CacheRepository } from '../database/repositories/Cache';
import { UserService } from '../services';

export default class AuthRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const service = new UserService();
        const cacheRepository = new CacheRepository();
        const controller = new AuthController(service, cacheRepository);

        routes.post('/auth', controller.authentication);

        return routes;
    }
}
