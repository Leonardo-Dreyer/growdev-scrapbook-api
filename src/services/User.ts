import { UserRepositorie } from '../core/data/repositories/User';
import { UserDto } from '../dto';

export class UserService {
    async create(userDto: UserDto) {
        const repository = new UserRepositorie();

        const user = await repository.create(userDto);

        return user;
    }

    async findOne(email: string) {
        const repository = new UserRepositorie();
        const messages = await repository.findOne(email);

        return messages;
    }
}
