import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/intercepts/serializedPublicUserIntercept';
import { PublicUser } from 'src/users/dtos/public-user.dto';

@Controller({ path: 'auth', version: '1' })
@Serialize(PublicUser)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
