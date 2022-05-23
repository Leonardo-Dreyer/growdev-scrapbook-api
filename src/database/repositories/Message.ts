import { MessageEntity } from '../entities/Message';
import { MessageDto } from '../../dto';

export class MessageRepositorie {
    create = async (messageDto: MessageDto) => {
        const message = await new MessageEntity(
            messageDto.uid,
            messageDto.description,
            messageDto.detailing,
            messageDto.userUid
        );
        message.save();

        return message;
    };

    find = async (uid: string) => {
        const messages = await MessageEntity.find({ where: { userUid: uid } });

        return messages;
    };

    findOne = async (uid: string) => {
        const message = await MessageEntity.findOne(uid);

        return message;
    };

    update = async (messageDto: MessageDto) => {
        const message = await MessageEntity.findOne(messageDto.uid);

        if (message) {
            message.description = messageDto.description;
            message.detailing = messageDto.detailing;
            await message.save();
        }

        return message;
    };

    delete = async (uid: string) => {
        await MessageEntity.delete(uid);
    };
}
