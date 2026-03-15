import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetAccessToken = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const tokenFromCookie = req?.cookies['token'] as string;
    const token =
      tokenFromCookie ||
      (req.headers.authorization
        ? req.headers.authorization?.split(' ')[1]
        : null);

    if (!token) {
      return null;
    }

    return token;
  },
);
