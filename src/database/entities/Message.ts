import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { UserEntity } from './User';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
    @PrimaryColumn()
    uid?: string;

    @Column()
    description: string;

    @Column()
    detailing: string;

    @Column({ name: 'user_uid' })
    userUid: string;

    @ManyToOne((type) => UserEntity, (user) => user.messages)
    @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid' })
    user?: UserEntity;

    constructor(
        uid: string,
        description: string,
        detailing: string,
        userUid: string
    ) {
        super();
        this.uid = uid;
        this.description = description;
        this.detailing = detailing;
        this.userUid = userUid;
    }
}
