import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (!user) throw new NotFoundException();
        if (!bcrypt.compareSync(pass, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}