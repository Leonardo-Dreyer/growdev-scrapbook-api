import { MessageEntity } from '../../database/entities/Message';
import { MessageDto } from '../../dto';

export interface MessageServiceInterface {
    find(uid: string): Promise<MessageEntity[]>;
    findOne(uid: string): Promise<MessageEntity | undefined>;
    create(messageDTO: MessageDto): Promise<MessageEntity>;
    update(messageDTO: MessageDto): Promise<MessageEntity | undefined>;
    delete(messageID: string): Promise<void>;
}
