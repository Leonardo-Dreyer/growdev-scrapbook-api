"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const Message_1 = require("../database/repositories/Message");
class MessageService {
    constructor() {
        this.create = async (messageDto) => {
            const repository = new Message_1.MessageRepositorie();
            const message = await repository.create(messageDto);
            return message;
        };
        this.find = async (uid) => {
            const repository = new Message_1.MessageRepositorie();
            const messages = await repository.find(uid);
            return messages;
        };
        this.findOne = async (uid) => {
            const repository = new Message_1.MessageRepositorie();
            const message = await repository.findOne(uid);
            return message;
        };
        this.update = async (messageDto) => {
            const repository = new Message_1.MessageRepositorie();
            const message = await repository.update(messageDto);
            return message;
        };
        this.delete = async (uid) => {
            const repository = new Message_1.MessageRepositorie();
            await repository.delete(uid);
        };
    }
}
exports.MessageService = MessageService;
