import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserJwtPayload } from './types';

export const User = createParamDecorator((field: keyof UserJwtPayload, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return field ? request.user[field] : request.user;
});
