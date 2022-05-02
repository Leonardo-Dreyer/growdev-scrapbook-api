import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { defaultErrorMessage, HttpInternalErrorCode } from '../constants';
import { MessageDto } from '../dto';
import { HttpError } from '../errors/HttpErrors';
import { MessageService } from '../services';

export default class MessageController {
    public async store(req: Request, res: Response) {
        const userUid = req.userUid;
        const { description, detailing } = req.body;

        const uid = uuid();
        const messageServise = new MessageService();
        const dto: MessageDto = {
            uid,
            description,
            detailing,
            userUid
        };

        try {
            const message = await messageServise.create(dto);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    public async index(req: Request, res: Response) {
        const uid = req.userUid;

        const messageServise = new MessageService();

        try {
            const messages = await messageServise.find(uid);

            return res.json(messages);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    public async show(req: Request, res: Response) {
        const { uid } = req.params;
        const messageServise = new MessageService();

        try {
            const message = await messageServise.findOne(uid);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    public async update(req: Request, res: Response) {
        const { uid } = req.params;
        const { description, detailing, userUid } = req.body;
        const messageServise = new MessageService();

        const dto: MessageDto = {
            uid,
            description,
            detailing,
            userUid
        };

        try {
            const message = await messageServise.update(dto);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    public async delete(req: Request, res: Response) {
        const { uid } = req.params;
        const messageServise = new MessageService();

        try {
            await messageServise.delete(uid);

            return res.sendStatus(200);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}
