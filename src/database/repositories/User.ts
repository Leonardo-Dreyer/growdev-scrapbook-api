import { UserEntity } from '../entities/User';
import { UserDto } from '../../dto';

export class UserRepositorie {
    async create(userDto: UserDto) {
        const user = new UserEntity(
            userDto.uid,
            userDto.email,
            userDto.password
        );
        user.save();

        return user;
    }

    async findOne(email: string) {
        const user = await UserEntity.findOne({ where: { email } });

        return user;
    }
}
