import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interfaces/users.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async authenticate(authenticateDto: AuthenticateDto) {
  //   const user = await this.usersService.findOneByUsername(
  //     authenticateDto.userName,
  //   );

  //   if (user && user.password) {
  //     if (bcrypt.compareSync(authenticateDto.password, user.password)) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //   }
  //   throw new UnauthorizedException();
  // }

  // async login(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
  //   const user = await this.authenticate(authenticateDto);
  //   const payload = {
  //     userName: user.userName,
  //     sub: user.id,
  //     roles: user.roles,
  //   };
  //   const token = this.jwtService.sign(payload);

  //   return {
  //     token,
  //     user: { id: user.id, userName: user.userName, roles: user.roles },
  //   };
  // }

  // async logout(username: string) {
  //   this.tokenService.delete(username);
  // }
}
