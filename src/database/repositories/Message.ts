import { MessageEntity } from '../entities/Message';
import { MessageDTO } from '../../dto';
import { HttpInternalErrorCode, HttpNoContentCode } from '../../constants';

export class MessageRepositorie {
    create = async (messageDTO: MessageDTO) => {
        const message = new MessageEntity(
            messageDTO.uid,
            messageDTO.description,
            messageDTO.detail,
            messageDTO.userUid
        ).save();

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

    update = async (messageDTO: MessageDTO) => {
        const message = await MessageEntity.findOne(messageDTO.uid);

        if (message) {
            message.description = messageDTO.description;
            message.detail = messageDTO.detail;
            await message.save();
        }

        return message;
    };

    delete = async (uid: string) => {
        try {
            await MessageEntity.delete(uid);
            return HttpNoContentCode;
        } catch (error) {
            return HttpInternalErrorCode;
        }
    };
}
