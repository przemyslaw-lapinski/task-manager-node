import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Infrastructure/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    create(email: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ email, password });
        return this.usersRepository.save(user);
    }
}
