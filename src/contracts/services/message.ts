import { MessageDTO } from '../../dto';
import { HttpError } from '../../errors/HttpErrors';

export interface MessageServiceInterface {
    find(uid: string): Promise<MessageDTO[]>;
    findOne(uid: string): Promise<MessageDTO | undefined>;
    create(messageDTO: MessageDTO): Promise<MessageDTO>;
    update(messageDTO: MessageDTO): Promise<MessageDTO | undefined>;
    delete(messageID: string): Promise<HttpError | unknown>;
}
