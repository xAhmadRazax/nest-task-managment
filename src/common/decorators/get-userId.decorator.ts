import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { JwtPayload } from '../interface/jwt-payload.interface';

export const GetUserId = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req?.user as JwtPayload;

    console.log(user.id);
    return user.id;
  },
);
