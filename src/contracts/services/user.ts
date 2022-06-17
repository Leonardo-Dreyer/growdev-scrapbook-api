import { UserDto } from '../../dto';

export interface UserServiceInterface {
    findOne(email: string): Promise<UserDto | undefined>;
    create(userDTO: UserDto): Promise<UserDto>;
}
