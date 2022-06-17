import { MessageServiceInterface } from '../contracts/services/message';
import { MessageRepositorie } from '../database/repositories/Message';
import { MessageDTO } from '../dto';

export class MessageService implements MessageServiceInterface {
    async find(uid: string) {
        const repository = new MessageRepositorie();
        const messages: MessageDTO[] = await repository.find(uid);

        return messages;
    }

    async findOne(uid: string) {
        const repository = new MessageRepositorie();
        const message: MessageDTO | undefined = await repository.findOne(uid);

        return message;
    }

    async create(messageDTO: MessageDTO) {
        const repository = new MessageRepositorie();
        const message: MessageDTO = await repository.create(messageDTO);

        return message;
    }

    async update(messageDTO: MessageDTO) {
        const repository = new MessageRepositorie();
        const message: MessageDTO | undefined = await repository.update(
            messageDTO
        );

        return message;
    }

    async delete(uid: string) {
        const repository = new MessageRepositorie();
        return await repository.delete(uid);
    }
}
