import { Injectable } from '@nestjs/common';
import { JwtPayload } from './types';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor() {}

  generateToken(payload: JwtPayload) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '15h' });
  }
}
