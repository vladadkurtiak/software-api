import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { responses } from 'src/shared/responses/responses';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    const token = cookies.token;

    if (!token) {
      throw new UnauthorizedException(responses.jwtToken.MISSING_AUTHORIZATION_TOKEN);
    }

    try {
      request.user = verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new UnauthorizedException(responses.jwtToken.INVALID_TOKEN);
    }
  }
}
