import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/Infrastructure/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string): Promise<string> {
        const existingUser: User | null =
            await this.usersService.findOne(email);
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds);

        await this.usersService.create(email, passwordHash);

        return 'User created successfully';
    }

    async signIn(email: string, password: string): Promise<string> {
        const user: User | null = await this.usersService.findOne(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if ((await bcrypt.compare(user?.password || '', password)) === false) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return 'token';
    }
}
