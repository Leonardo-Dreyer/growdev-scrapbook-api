import UserController from '../../src/controllers/User';
import { UserService } from '../../src/services';
import { UserRepositorie } from '../../src/database/repositories';
import { Request, Response } from 'express';
import { HttpError } from '../../src/errors/HttpErrors';
import {
    defaultErrorMessage,
    HttpCreatedCode,
    HttpInternalErrorCode,
    HttpSuccessCode
} from '../../src/constants';
import { UserDto } from '../../src/dto';

jest.mock('../../src/database/repositories/User.ts');

const makeSut = () => new UserController(new UserService());

describe('User Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('Index (List)', () => {
        it('should return 200 when authenticated', async () => {
            const sut = makeSut();

            const request = {} as Request;
            const response: any = {
                json: jest.fn(),
                sendStatus: jest.fn().mockResolvedValue(HttpSuccessCode)
            };

            const responseController = await sut.index(request, response);

            expect(responseController).toEqual(HttpSuccessCode);
        });
    });

    describe('Store (Save)', () => {
        it('should return 200 when authenticated', async () => {
            const sut = makeSut();
            const dto: UserDto = {
                uid: '1',
                email: 'teste@jest.com',
                password: '123456'
            };

            jest.spyOn(UserService.prototype, 'create').mockResolvedValue(dto);

            const request = {} as Request;

            const responseController = await sut.index(request);

            expect(responseController).toEqual(HttpCreatedCode);
        });
    });
});
