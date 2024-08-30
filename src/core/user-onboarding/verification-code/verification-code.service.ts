import { ConflictException, Injectable } from '@nestjs/common';

import { UserOnboardingStepStatus } from '@prisma/client';
import { responses } from 'src/shared/responses/responses';

import { PrismaService } from 'src/shared/database/prisma.service';
import { MailService } from 'src/shared/mail/mail.service';

@Injectable()
export class UserOnboardingVerificationCodeService {
  constructor(
    private readonly db: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private generateVerificationCode() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  }

  async sendVerificationCode(userOnboardingId: string) {
    const userOnboarding = await this.db.userOnboarding.findFirstOrThrow({
      where: { id: userOnboardingId },
    });

    if (userOnboarding.verificationCode === UserOnboardingStepStatus.COMPLETED) {
      throw new ConflictException(responses.userOnboarding.STEP_ALREADY_PASSED);
    }

    const code = this.generateVerificationCode();

    await this.db.userOnboardingVerificationCode.create({
      data: { code, userOnboardingId },
    });

    this.mailService.sendVerificationCodeByEmail({
      email: userOnboarding.email,
      code,
    });
  }
}
