import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
    HttpUnauthorizedCode,
    invalidUser,
    invalidPassword
} from '../constants';
import { CacheRepositoryInterface } from '../contracts/repositories';
import { UserServiceInterface } from '../contracts/services/user';

export default class AuthController {
    constructor(
        private service: UserServiceInterface,
        private cacheRepository: CacheRepositoryInterface
    ) {}
    authentication = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await this.service.findOne(email);

        await this.cacheRepository.delete('message:all');

        if (!user) {
            return res
                .status(HttpUnauthorizedCode)
                .json({ message: invalidUser });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res
                .status(HttpUnauthorizedCode)
                .json({ message: invalidPassword });
        }

        const token = jwt.sign({ uid: user.uid }, 'fsdfsdf232r23f23frg3g3gg4', {
            expiresIn: '1d'
        });

        return res.json({
            user,
            token
        });
    };
}
