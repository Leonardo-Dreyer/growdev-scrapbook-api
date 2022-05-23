"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../database/repositories/User");
class UserService {
    async findOne(email) {
        const repository = new User_1.UserRepositorie();
        const messages = await repository.findOne(email);
        return messages;
    }
    async create(userDto) {
        const repository = new User_1.UserRepositorie();
        const user = await repository.create(userDto);
        return user;
    }
}
exports.UserService = UserService;
