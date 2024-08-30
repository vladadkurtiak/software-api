import { Controller, Post, UseGuards } from '@nestjs/common';

import { UserOnboardingVerificationCodeService } from './verification-code.service';

import { JwtAuthGuard } from 'src/shared/jwt/guards/jwt.guard';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('/user-onboarding/verification-code')
export class UserOnboardingVerificationCodeController {
  constructor(private readonly userOnboardingVerificationCodeService: UserOnboardingVerificationCodeService) {}

  @Post('resend')
  @UseGuards(JwtAuthGuard)
  async resend(@User('id') userOnboardingId: string) {
    await this.userOnboardingVerificationCodeService.sendVerificationCode(userOnboardingId);

    return { success: true };
  }
}
