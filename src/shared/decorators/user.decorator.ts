import { ExecutionContext, createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UserJwtPayload } from './types';
import { responses } from '../responses/responses';

export const User = createParamDecorator((field: keyof UserJwtPayload, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const cookies = request.cookies;

  const token = cookies.token;

  try {
    const payload = verify(token, process.env.JWT_SECRET) as UserJwtPayload;

    return field ? payload[field] : payload;
  } catch (error) {
    throw new UnauthorizedException(responses.jwtToken.INVALID_TOKEN);
  }
});
