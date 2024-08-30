import { User } from 'src/core/user-onboarding/entities/auth.entity';

export type UserJwtPayload = Pick<User, 'id'>;
