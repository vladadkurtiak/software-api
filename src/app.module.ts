import { Module } from '@nestjs/common';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { MailModule } from './shared/mail/mail.module';
import { PrismaModule } from './shared/database/prisma.module';
import { UserOnboardingModule } from './core/user-onboarding/root.module';

@Module({
  imports: [PrismaModule, UserOnboardingModule, JwtModule, MailModule],
})
export class AppModule {}
