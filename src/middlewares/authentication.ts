import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';
import { defaultErrorMessage, HttpUnauthorizedCode } from '../constants';
import { HttpError } from '../errors/HttpErrors';

interface TokenPayload {
    uid: string;
    iat: number;
    exp: number;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(HttpUnauthorizedCode)
            .json({ message: defaultErrorMessage });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'fsdfsdf232r23f23frg3g3gg4');

        const { uid } = data as TokenPayload;

        req.userUid = uid;

        return next();
    } catch {
        throw new HttpError(defaultErrorMessage, HttpUnauthorizedCode);
    }
};
