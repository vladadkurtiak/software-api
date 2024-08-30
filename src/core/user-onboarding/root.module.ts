import { Module } from '@nestjs/common';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { UserOnboardingVerificationCodeModule } from './verification-code/verification-code.module';
import { UserOnboardingService } from './root.service';
import { UserOnboardingController } from './root.controller';

@Module({
  imports: [UserOnboardingVerificationCodeModule, JwtModule],
  controllers: [UserOnboardingController],
  providers: [UserOnboardingService],
  exports: [UserOnboardingService],
})
export class UserOnboardingModule {}
