import { UserEntity } from '../entities/User';
import { UserDto } from '../../dto';

export class UserRepositorie {
    async findOne(email: string) {
        const response = await UserEntity.findOne({ where: { email } });

        return response;
    }

    async create(userDto: UserDto) {
        const user = new UserEntity(
            userDto.uid,
            userDto.email,
            userDto.password
        );
        user.save();

        return user;
    }
}
