import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    private usersService: UsersService;

    constructor(private usersService: UsersService) {}

    signIn(username: string, pass: string): Promise<string> {
        const user: User = this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        // const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return 'token';
    }
}
