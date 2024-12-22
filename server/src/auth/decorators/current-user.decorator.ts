import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    if (_data) {
      return request.user[_data];
    }
    return request;
  },
);
