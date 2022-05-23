"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositorie = void 0;
const User_1 = require("../entities/User");
class UserRepositorie {
    async create(userDto) {
        const user = new User_1.UserEntity(userDto.uid, userDto.email, userDto.password);
        user.save();
        return user;
    }
    async findOne(email) {
        const user = await User_1.UserEntity.findOne({ where: { email } });
        return user;
    }
}
exports.UserRepositorie = UserRepositorie;
