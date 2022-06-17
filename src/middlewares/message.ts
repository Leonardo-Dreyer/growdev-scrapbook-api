import { Request, Response, NextFunction } from 'express';
import { HttpBadRequestCode, invalidField } from '../constants';

export const messageMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { description, detail } = req.body;

    if (!description || !detail) {
        return res.status(HttpBadRequestCode).json({
            message: invalidField('Campo de recado')
        });
    }

    next();
};
