import { UserRepositorie } from '../database/repositories/User';
import { UserServiceInterface } from '../contracts/services/user';
import { UserDto } from '../dto';

export class UserService implements UserServiceInterface {
    async findOne(email: string) {
        const repository = new UserRepositorie();
        const response: UserDto | undefined = await repository.findOne(email);

        return response;
    }
    async create(userDto: UserDto) {
        const repository = new UserRepositorie();

        const user: UserDto = await repository.create(userDto);

        return user;
    }
}
