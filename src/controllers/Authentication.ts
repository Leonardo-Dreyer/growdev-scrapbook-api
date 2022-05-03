import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserService } from '../services/User';
import {
    HttpUnauthorizedCode,
    invalidUser,
    invalidPassword
} from '../constants';

export default class AuthController {
    public async authentication(req: Request, res: Response) {
        const { email, password } = req.body;
        const userService = new UserService();
        const user = await userService.findOne(email);
        console.log('entrou');

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
    }
}
