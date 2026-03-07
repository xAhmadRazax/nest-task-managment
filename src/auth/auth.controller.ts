import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/intercepts/serializedPublicUserIntercept';
import { PublicUser } from 'src/users/dtos/public-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller({ path: 'auth', version: '1' })
@Serialize(AuthResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return { user: this.authService.registerUser(createUserDto) };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    const res = await this.authService.loginUser(loginUserDto);
    console.log(res);
    return { user: res.user, accessToken: res.accessToken };
  }
}
