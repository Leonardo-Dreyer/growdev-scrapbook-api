import { Request, Response, NextFunction } from 'express';
import { HttpBadRequestCode, invalidField } from '../constants';

export const messageValidateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { description, detailing } = req.body;

    if (!description || !detailing) {
        return res.status(HttpBadRequestCode).json({
            message: invalidField('Recado')
        });
    }

    next();
};
