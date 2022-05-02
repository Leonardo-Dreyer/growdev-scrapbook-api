import { Router } from 'express';
import { HttpRouter } from '../contracts';
import MessageController from '../controllers/Message';
import { authMiddleware, messageValidateMiddleware } from '../middlewares';

export default class MessageRoutes implements HttpRouter {
    init() {
        const routes = Router();
        const controller = new MessageController();

        routes.get('/message', authMiddleware, controller.index);
        routes.get('/message/:uid', controller.show);
        routes.post(
            '/message',
            authMiddleware,
            messageValidateMiddleware,
            controller.store
        );
        routes.put(
            '/message/:uid',
            messageValidateMiddleware,
            controller.update
        );
        routes.delete('/message/:uid', controller.delete);

        return routes;
    }
}
