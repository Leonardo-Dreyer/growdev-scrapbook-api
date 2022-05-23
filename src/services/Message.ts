import { MessageServiceInterface } from '../contracts/services/message';
import { MessageRepositorie } from '../database/repositories/Message';
import { MessageDto } from '../dto';

export class MessageService implements MessageServiceInterface {
    create = async (messageDto: MessageDto) => {
        const repository = new MessageRepositorie();
        const message = await repository.create(messageDto);

        return message;
    };

    find = async (uid: string) => {
        const repository = new MessageRepositorie();
        const messages = await repository.find(uid);

        return messages;
    };

    findOne = async (uid: string) => {
        const repository = new MessageRepositorie();
        const message = await repository.findOne(uid);

        return message;
    };

    update = async (messageDto: MessageDto) => {
        const repository = new MessageRepositorie();
        const message = await repository.update(messageDto);

        return message;
    };

    delete = async (uid: string) => {
        const repository = new MessageRepositorie();
        await repository.delete(uid);
    };
}
