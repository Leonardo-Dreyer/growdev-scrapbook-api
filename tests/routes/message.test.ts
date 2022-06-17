import request from 'supertest';
import jwt from 'jsonwebtoken';

import Application from '../../src/app';
import { MessageService } from '../../src/services';
import { MessageDTO } from '../../src/dto';
import {
    HttpBadRequestCode,
    HttpCreatedCode,
    HttpInternalErrorCode,
    HttpNoContentCode,
    HttpSuccessCode,
    HttpUnauthorizedCode,
    invalidUidMessage
} from '../../src/constants';

jest.mock('../../src/services/Message.ts');
jest.mock('../../src/database/repositories/Cache.ts');

describe('Message route', () => {
    const application = new Application();
    application.init();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /message', () => {
        it('should return messageDTO array when send valid token', async () => {
            const dto: MessageDTO[] = [
                {
                    uid: '1',
                    description: 'description',
                    detail: 'detail',
                    userUid: '1'
                }
            ];

            jest.spyOn(MessageService.prototype, 'find').mockResolvedValue(dto);
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .get('/message')
                .set('Authorization', `Bearer ${token}`)
                .expect(dto);
        });

        it('should return 401 when send invalid token', async () => {
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23');

            await request(application.server)
                .get('/message')
                .set('Authorization', `Bearer ${token}`)
                .expect(HttpUnauthorizedCode);
        });

        it('should return 401 when send token is missing', async () => {
            await request(application.server)
                .get('/message')
                .expect(HttpUnauthorizedCode);
        });

        it('should return messageDTO when send existing uid on params', async () => {
            const dto: MessageDTO = {
                uid: '1',
                description: 'description',
                detail: 'detail',
                userUid: '1'
            };
            jest.spyOn(MessageService.prototype, 'findOne').mockResolvedValue(
                dto
            );
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .get('/message/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(dto);
        });

        it('should return 400 when send non-existent uid on params', async () => {
            jest.spyOn(MessageService.prototype, 'findOne').mockResolvedValue(
                undefined
            );
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .get('/message/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(HttpBadRequestCode);
        });
    });

    describe('POST /message', () => {
        it('should return messageDTO when send valid credentials', async () => {
            const dto: MessageDTO = {
                uid: '1',
                description: 'description',
                detail: 'detail',
                userUid: '1'
            };

            jest.spyOn(MessageService.prototype, 'create').mockResolvedValue(
                dto
            );

            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .post('/message')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'description',
                    detail: 'detail'
                })
                .expect(dto);
        });

        it('should return invalid field message when sending empty field', async () => {
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f23frg3g3gg4');

            await request(application.server)
                .post('/message')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: '',
                    detail: 'detail'
                })
                .expect({ message: 'Campo de recado inválido!' });

            await request(application.server)
                .post('/message')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'description',
                    detail: ''
                })
                .expect({ message: 'Campo de recado inválido!' });
        });

        it('should return 401 when send invalid token', async () => {
            const token = jwt.sign({ uid: '1' }, 'fsdfsdf232r23f2');

            await request(application.server)
                .post('/message')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'description',
                    detail: 'detail'
                })
                .expect(HttpUnauthorizedCode);
        });

        it('should return 401 when token is missing', async () => {
            await request(application.server)
                .post('/message')
                .send({
                    description: 'description',
                    detail: 'detail'
                })
                .expect(HttpUnauthorizedCode);
        });
    });

    describe('PUT /message', () => {
        it('should return messageDTO array when send filled fields', async () => {
            const dto: MessageDTO = {
                uid: '1',
                description: 'description',
                detail: 'detail',
                userUid: '1'
            };
            jest.spyOn(MessageService.prototype, 'update').mockResolvedValue(
                dto
            );

            await request(application.server)
                .put('/message/1')
                .send({
                    description: 'description',
                    detail: 'detail'
                })
                .expect(dto);
        });

        it('should return 400 array when send invalid uid on params', async () => {
            jest.spyOn(MessageService.prototype, 'update').mockResolvedValue(
                undefined
            );

            await request(application.server)
                .put('/message/1')
                .send({
                    description: 'description',
                    detail: 'detail'
                })
                .expect(HttpBadRequestCode);
        });
    });

    describe('DELETE /message', () => {
        it('should return 204 when sending existing uid by parameters', async () => {
            jest.spyOn(MessageService.prototype, 'delete').mockResolvedValue(
                HttpNoContentCode
            );

            await request(application.server)
                .delete('/message/1')
                .expect(HttpNoContentCode);
        });
        it('should return error message when sending non-existing uid by parameters', async () => {
            jest.spyOn(MessageService.prototype, 'delete').mockResolvedValue(
                HttpInternalErrorCode
            );

            await request(application.server)
                .delete('/message/1')
                .expect({ message: 'Menssagem não encontrada!' });
        });
    });
});
