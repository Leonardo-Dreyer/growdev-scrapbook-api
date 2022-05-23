import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
    defaultErrorMessage,
    HttpBadRequestCode,
    HttpInternalErrorCode
} from '../constants';
import { UserServiceInterface } from '../contracts/services/user';
import { UserDto } from '../dto';
import { HttpError } from '../errors/HttpErrors';

export default class UserController {
    constructor(private service: UserServiceInterface) {}

    index = async (req: Request, res: Response) => {
        return res.sendStatus(200);
    };

    store = async (req: Request, res: Response) => {
        const uid = uuid();
        const { email, password } = req.body;
        const user = await this.service.findOne(email);

        if (user) {
            return res.status(HttpBadRequestCode).json({
                message: 'Email já cadastrado, tente um email diferente!'
            });
        }

        const dto: UserDto = {
            uid,
            email,
            password
        };
        try {
            await this.service.create(dto);

            return res.sendStatus(201);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    };
}
