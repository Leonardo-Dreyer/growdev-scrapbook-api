import { UserEntity } from '../../database/entities/User';
import { UserDto } from '../../dto';

export interface UserServiceInterface {
    findOne(email: string): Promise<UserEntity | undefined>;
    create(userDTO: UserDto): Promise<UserEntity>;
}
