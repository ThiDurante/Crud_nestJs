import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface userLogin {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: userLogin) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
