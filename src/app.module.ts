import { Module } from '@nestjs/common';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { MailModule } from './shared/mail/mail.module';
import { PrismaModule } from './shared/database/prisma.module';
import { UserOnboardingModule } from './core/user-onboarding/root.module';
import { UserOnboardingVerificationCodeModule } from './core/user-onboarding/verification-code/verification-code.module';

@Module({
  imports: [PrismaModule, UserOnboardingModule, UserOnboardingVerificationCodeModule, JwtModule, MailModule],
})
export class AppModule {}
