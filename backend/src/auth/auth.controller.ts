import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
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
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import type { Request, Response } from 'express';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { COOKIE_OPTIONS } from 'src/common/constants';

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
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const data = await this.authService.loginUser(loginUserDto);

    response.cookie('token', data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: parseInt(process.env.JWT_EXPIRY!) * 24 * 60 * 60 * 1000,
    });

    return { user: data.user, accessToken: data.accessToken };
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() { email }: ForgotPasswordDto,
    @Req() req: Request,
  ) {
    const token = await this.authService.forgotPassword(email);
    if (!token) {
      return;
    }
    const url = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${token}`;
    return { passwordResetUrl: url };
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetpasswordDto: ResetPasswordDto,
  ) {
    const user = await this.authService.resetPassword(token, resetpasswordDto);
    return { user };
  }

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
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetAccessToken() token: string,
  ) {
    await this.blacklistTokenService.blacklistToken(token);
    return res.clearCookie('token', COOKIE_OPTIONS);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@GetUserId() id: string) {
    const user = await this.authService.findMe(id);
    return { user };
  }
}
