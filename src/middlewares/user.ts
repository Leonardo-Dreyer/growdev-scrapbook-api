import { Request, Response, NextFunction } from 'express';
import { HttpBadRequestCode } from '../constants';
import { UserService } from '../services';

export const userMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    const userService = new UserService();

    if (!email || !password) {
        return res.status(HttpBadRequestCode).json({
            message: 'Preencha todos os campos!'
        });
    } else if (password.length < 4) {
        return res.status(HttpBadRequestCode).json({
            message: 'Senha incorreta, deve conter mais de 4 dígitos!'
        });
    }
    next();
};
