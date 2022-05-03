import { MessageEntity } from '../entities/Message';
import { MessageDto } from '../../dto';

export class MessageRepositorie {
    async create(messageDto: MessageDto) {
        const message = await new MessageEntity(
            messageDto.uid,
            messageDto.description,
            messageDto.detailing,
            messageDto.userUid
        );
        message.save();

        return message;
    }

    async find(uid: string) {
        const messages = await MessageEntity.find({ where: { userUid: uid } });

        return messages;
    }

    async findOne(uid: string) {
        const message = await MessageEntity.findOne(uid);

        return message;
    }

    async update(messageDto: MessageDto) {
        const message = await MessageEntity.findOne(messageDto.uid);

        if (message) {
            message.description = messageDto.description;
            message.detailing = messageDto.detailing;
            message.save();
        }

        return message;
    }

    async delete(uid: string) {
        await MessageEntity.delete(uid);
    }
}
