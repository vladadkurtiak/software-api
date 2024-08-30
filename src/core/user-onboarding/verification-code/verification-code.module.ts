import { UserOnboardingVerificationCodeController } from './verification-code.controller';

import { UserOnboardingVerificationCodeService } from './verification-code.service';

import { Module } from '@nestjs/common';
import { MailModule } from 'src/shared/mail/mail.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';

@Module({
  imports: [MailModule, JwtModule],
  controllers: [UserOnboardingVerificationCodeController],
  providers: [UserOnboardingVerificationCodeService],
  exports: [UserOnboardingVerificationCodeService],
})
export class UserOnboardingVerificationCodeModule {}
