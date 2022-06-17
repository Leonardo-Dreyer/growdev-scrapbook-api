import { Router } from 'express';
import MessageController from '../controllers/Message';
import { authMiddleware, messageMiddleware } from '../middlewares';
import { HttpRouter } from '../contracts';
import { MessageService } from '../services';
import { CacheRepository } from '../database/repositories/Cache';

export default class MessageRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const service = new MessageService();
        const cacheRepository = new CacheRepository();
        const controller = new MessageController(service, cacheRepository);

        routes.get('/message', authMiddleware, controller.index);
        routes.get('/message/:uid', controller.show);
        routes.post(
            '/message',
            authMiddleware,
            messageMiddleware,
            controller.store
        );
        routes.put('/message/:uid', messageMiddleware, controller.update);
        routes.delete('/message/:uid', controller.delete);

        return routes;
    }
}
