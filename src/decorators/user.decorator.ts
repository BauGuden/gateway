import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { create } from "domain";

export const User = createParamDecorator((_:unknown, ctx: ExecutionContext) => {
  
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new InternalServerErrorException('User not found in request');
    }

    return request.user;

});