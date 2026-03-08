import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetAccessToken = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;

    if (!auth?.startsWith('Bearer') || !auth) {
      return null;
    }

    return auth.split(' ').at(1);
  },
);
