import request from 'supertest';
import jwt from 'jsonwebtoken';

import Application from '../../src/app';
import { UserService } from '../../src/services';
import { UserDto } from '../../src/dto';
import {
    HttpCreatedCode,
    HttpSuccessCode,
    HttpUnauthorizedCode
} from '../../src/constants';

jest.mock('../../src/services/User.ts');

describe('User route', () => {
    const application = new Application();
    application.init();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /user', () => {
        it('should return 200 when user has valid token', async () => {
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .get('/user')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'teste@jest.com',
                    password: '123456'
                })
                .expect(HttpSuccessCode);
        });

        it('should return 401 when user has an invalid token', async () => {
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23fr');

            await request(application.server)
                .get('/user')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'teste@jest.com',
                    password: '123456'
                })
                .expect(HttpUnauthorizedCode);
        });

        it('should return 401 when user does not have a token', async () => {
            await request(application.server)
                .get('/user')
                .send({
                    email: 'teste@jest.com',
                    password: '123456'
                })
                .expect(HttpUnauthorizedCode);
        });
    });

    describe('POST /user', () => {
        it('should return 201 when send valid credentials', async () => {
            const dto: UserDto = {
                uid: '1',
                email: 'teste@jest.com',
                password: '123456'
            };

            jest.spyOn(UserService.prototype, 'create').mockResolvedValue(dto);

            await request(application.server)
                .post('/user')
                .send({
                    email: 'teste@jest.com',
                    password: '123456'
                })
                .expect(HttpCreatedCode);
        });

        it('should return message when credentials are missing', async () => {
            await request(application.server)
                .post('/user')
                .send({
                    email: null,
                    password: '123456'
                })
                .expect({
                    message: 'Preencha todos os campos!'
                });

            await request(application.server)
                .post('/user')
                .send({
                    email: 'teste@jest.com',
                    password: null
                })
                .expect({
                    message: 'Preencha todos os campos!'
                });
        });

        it('should return message when password is less than 4 characters', async () => {
            await request(application.server)
                .post('/user')
                .send({
                    email: 'teste@jest.com',
                    password: '123'
                })
                .expect({
                    message: 'Senha incorreta, deve conter mais de 4 dígitos!'
                });
        });

        it('should return message when the email is already registered', async () => {
            const dto: UserDto = {
                uid: '1',
                email: 'teste@jest.com',
                password: '123456'
            };

            jest.spyOn(UserService.prototype, 'findOne').mockResolvedValue(dto);

            await request(application.server)
                .post('/user')
                .send({
                    email: 'teste@jest.com',
                    password: '123456'
                })
                .expect({
                    message: 'Email já cadastrado, tente um email diferente!'
                });
        });
    });
});
