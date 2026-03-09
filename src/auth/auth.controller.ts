import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/intercepts/serializedPublicUserIntercept';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { BlacklistTokenService } from './blacklist-token.service';
import { GetAccessToken } from './decorators/get-accesstoken.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUserId } from 'src/common/decorators/get-userId.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller({ path: 'auth', version: '1' })
@Serialize(AuthResponseDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistTokenService: BlacklistTokenService,
  ) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return { user: this.authService.registerUser(createUserDto) };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    const res = await this.authService.loginUser(loginUserDto);
    return { user: res.user, accessToken: res.accessToken };
  }

  @Post('/forgot-password')
  async forgotPassword() {}

  @Post('/reset=password')
  async resetPassword() {}

  @UseGuards(AuthGuard)
  @Post('/change-password')
  @HttpCode(204)
  async changePassword(
    @GetUserId() id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(id, changePasswordDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  logout(@GetAccessToken() token: string) {
    return this.blacklistTokenService.blacklistToken(token);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@GetUserId() id: string) {
    const user = await this.authService.findMe(id);
    return { user };
  }
}
