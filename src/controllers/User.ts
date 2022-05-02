import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
    defaultErrorMessage,
    HttpBadRequestCode,
    HttpInternalErrorCode
} from '../constants';
import { UserDto } from '../dto';
import { HttpError } from '../errors/HttpErrors';
import { UserService } from '../services';

export default class UserController {
    public async store(req: Request, res: Response) {
        const uid = uuid();
        const { email, password } = req.body;
        const userService = new UserService();
        const user = await userService.findOne(email);

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
            await userService.create(dto);

            return res.sendStatus(201);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    public async index(req: Request, res: Response) {
        return res.sendStatus(200);
    }
}
