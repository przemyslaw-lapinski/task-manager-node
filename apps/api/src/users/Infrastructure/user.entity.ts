import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/Database/base.entity';

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;
}
