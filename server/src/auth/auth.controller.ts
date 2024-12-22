import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RoleGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
  //   try {
  //     const response = await this.authService.login(authenticateDto);
  //     return res.status(HttpStatus.OK).json({ response });
  //   } catch (error) {
  //     return res.status(error.status).json(error.response);
  //   }
  // }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
