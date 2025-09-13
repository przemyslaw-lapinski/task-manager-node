import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    signIn(username: string, pass: string): string {
        const user: User | undefined = this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        // const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return 'token';
    }
}
