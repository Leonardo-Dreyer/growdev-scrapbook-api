import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { MessageEntity } from './Message';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uid: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany((type) => MessageEntity, (message) => message.user)
    messages?: MessageEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    constructor(uid: string, email: string, password: string) {
        super();
        this.uid = uid;
        this.email = email;
        this.password = password;
    }
}
