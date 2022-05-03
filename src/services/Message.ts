import { MessageRepositorie } from '../database/repositories/Message';
import { MessageDto } from '../dto';

export class MessageService {
    async create(messageDto: MessageDto) {
        const repository = new MessageRepositorie();
        const message = await repository.create(messageDto);

        return message;
    }

    async find(uid: string) {
        const repository = new MessageRepositorie();
        const messages = await repository.find(uid);

        return messages;
    }

    async findOne(uid: string) {
        const repository = new MessageRepositorie();
        const message = await repository.findOne(uid);

        return message;
    }

    async update(messageDto: MessageDto) {
        const repository = new MessageRepositorie();
        const message = await repository.update(messageDto);

        return message;
    }

    async delete(uid: string) {
        const repository = new MessageRepositorie();
        await repository.delete(uid);
    }
}
