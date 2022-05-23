import { UserRepositorie } from '../database/repositories/User';
import { UserServiceInterface } from '../contracts/services/user';
import { UserDto } from '../dto';

export class UserService implements UserServiceInterface {
    async findOne(email: string) {
        const repository = new UserRepositorie();
        const messages = await repository.findOne(email);

        return messages;
    }
    async create(userDto: UserDto) {
        const repository = new UserRepositorie();

        const user = await repository.create(userDto);

        return user;
    }
}
