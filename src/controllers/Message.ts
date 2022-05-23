import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { defaultErrorMessage, HttpInternalErrorCode } from '../constants';
import { MessageServiceInterface } from '../contracts/services/message';
import { CacheRepositoryInterface } from '../contracts/repositories';
import { MessageDto } from '../dto';
import { HttpError } from '../errors/HttpErrors';

export default class MessageController {
    constructor(
        private service: MessageServiceInterface,
        private cacheRepository: CacheRepositoryInterface
    ) {}

    index = async (req: Request, res: Response) => {
        const userUid = req.userUid;
        try {
            const cache = await this.cacheRepository.find('message:all');

            if (cache) {
                return res.json(cache);
            }

            const messages = await this.service.find(userUid);

            const json = messages.map((message) => {
                return {
                    uid: message.uid,
                    description: message.description,
                    detailing: message.detailing
                };
            });

            await this.cacheRepository.save('message:all', json);

            return res.json(messages);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };

    show = async (req: Request, res: Response) => {
        const { uid } = req.params;

        try {
            const cache = await this.cacheRepository.find(`message:${uid}`);

            if (cache) {
                return res.status(200).json(cache);
            }

            const message = await this.service.findOne(uid);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };

    store = async (req: Request, res: Response) => {
        const uid = uuid();
        const userUid = req.userUid;
        const { description, detailing } = req.body;

        const dto: MessageDto = {
            uid,
            description,
            detailing,
            userUid
        };

        try {
            await this.cacheRepository.delete('message:all');

            const message = await this.service.create(dto);

            await this.cacheRepository.save(`message:${message.uid}`, message);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };

    update = async (req: Request, res: Response) => {
        const { uid } = req.params;
        const { description, detailing, userUid } = req.body;

        const dto: MessageDto = {
            uid,
            description,
            detailing,
            userUid
        };

        try {
            await this.cacheRepository.delete(`message:${uid}`);
            await this.cacheRepository.delete('message:all');

            const message = await this.service.update(dto);

            await this.cacheRepository.save(`message:${uid}`, message);

            return res.status(200).json(message);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };

    delete = async (req: Request, res: Response) => {
        const { uid } = req.params;

        try {
            await this.cacheRepository.delete('message:all');
            await this.cacheRepository.delete(`message:${uid}`);

            await this.service.delete(uid);

            return res.sendStatus(204);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };
}
