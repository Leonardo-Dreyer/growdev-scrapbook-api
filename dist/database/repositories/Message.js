"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepositorie = void 0;
const Message_1 = require("../entities/Message");
class MessageRepositorie {
    constructor() {
        this.create = async (messageDto) => {
            const message = await new Message_1.MessageEntity(messageDto.uid, messageDto.description, messageDto.detailing, messageDto.userUid);
            message.save();
            return message;
        };
        this.find = async (uid) => {
            const messages = await Message_1.MessageEntity.find({ where: { userUid: uid } });
            return messages;
        };
        this.findOne = async (uid) => {
            const message = await Message_1.MessageEntity.findOne(uid);
            return message;
        };
        this.update = async (messageDto) => {
            const message = await Message_1.MessageEntity.findOne(messageDto.uid);
            if (message) {
                message.description = messageDto.description;
                message.detailing = messageDto.detailing;
                await message.save();
            }
            return message;
        };
        this.delete = async (uid) => {
            await Message_1.MessageEntity.delete(uid);
        };
    }
}
exports.MessageRepositorie = MessageRepositorie;
