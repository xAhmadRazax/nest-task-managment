import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { BlacklistTokenService } from 'src/auth/blacklist-token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly blackListTokenService: BlacklistTokenService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (
      !token ||
      (await this.blackListTokenService.isTokenBlackListed(token))
    ) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passsed in the JwtModule
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const user = await this.userService.findOne(payload.email);
      console.log(user, payload);

      if (!user) {
        await this.blackListTokenService.blacklistToken(token);
        throw new UnauthorizedException();
      }

      if (
        user &&
        user.passwordChangedAt &&
        payload.iat &&
        user.passwordChangedAt.getTime() / 1000 > payload.iat
      ) {
        await this.blackListTokenService.blacklistToken(token);
        throw new UnauthorizedException();
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token =
      (request?.cookies['token'] as string) ||
      request.headers.authorization?.split(' ')[1];

    console.log(token);
    return token ?? undefined;
  }
}
