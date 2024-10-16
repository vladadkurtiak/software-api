import { JwtService } from '../../shared/jwt/jwt.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserOnboardingVerificationCodeService } from './verification-code/verification-code.service';

import { ConflictException, Injectable } from '@nestjs/common';
import { responses } from 'src/shared/responses/responses';
import { UserOnboardingStepStatus } from '@prisma/client';

import { StartRegisterDto } from './dto/start-register.dto';
import { PassInfoStepBodyDto } from './dto/pass-info-step.body.dto';
import { SignWithGoogleBodyPayloadDto } from './dto/sign-with-google.body.dto';
import { PassVerificationCodeStepBodyPayloadDto } from './dto/pass-verification-code-step.body.dto';
import { LoginDto } from './dto/login.dto';

import { compare, hashSync } from 'bcryptjs';
import axios from 'axios';
@Injectable()
export class UserOnboardingService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userOnboardingVerificationCodeService: UserOnboardingVerificationCodeService,
  ) {}

  async getUserByToken(token: string) {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);

    return response.data;
  }

  async startRegister(dto: StartRegisterDto) {
    await new Promise((r) => {
      setTimeout(() => {
        r(null);
      }, 1700);
    });

    const existingUser = await this.db.user.findFirst({
      where: { email: dto.email },
      include: { userOnboarding: true },
    });

    if (existingUser) {
      throw new ConflictException(responses.auth.USER_EXISTS);
    }

    const relatedOnboardings = await this.db.userOnboarding.findMany({
      where: { email: dto.email },
    });

    await Promise.all([
      this.db.userOnboarding.deleteMany({
        where: { id: { in: relatedOnboardings.map((o) => o.id) } },
      }),
    ]);

    const userOnboarding = await this.db.userOnboarding.create({
      data: { email: dto.email },
    });

    await this.userOnboardingVerificationCodeService.sendVerificationCode(userOnboarding.id);

    const token = this.jwtService.generateToken({
      id: userOnboarding.id,
    });

    return { token };
  }

  async passVerificationCodeStep(userOnboardingId: string, dto: PassVerificationCodeStepBodyPayloadDto) {
    const onboarding = await this.db.userOnboarding.findFirstOrThrow({
      where: { id: userOnboardingId },
      include: { user: true, verificationCodes: { orderBy: { createdAt: 'desc' } } },
    });

    if (onboarding.verificationCode === UserOnboardingStepStatus.COMPLETED) {
      throw new ConflictException(responses.userOnboarding.STEP_ALREADY_PASSED);
    }

    const [verificationCode] = onboarding.verificationCodes;

    if (verificationCode?.code !== dto.code || !verificationCode) {
      throw new ConflictException(responses.userOnboarding.INVALID_VERIFICATION_CODE);
    }

    await this.db.userOnboarding.update({
      where: { id: userOnboardingId },
      data: { verificationCode: UserOnboardingStepStatus.COMPLETED },
    });

    return responses.userOnboarding.VERIFICATION_CODE_PASSED;
  }

  async passInfoStep(userOnboardingId: string, dto: PassInfoStepBodyDto) {
    await new Promise((r) => {
      setTimeout(() => {
        r(null);
      }, 1700);
    });
    const onboarding = await this.db.userOnboarding.findFirstOrThrow({
      where: { id: userOnboardingId },
      include: { user: true, verificationCodes: { orderBy: { createdAt: 'desc' } } },
    });

    if (onboarding.info === UserOnboardingStepStatus.COMPLETED) {
      throw new ConflictException(responses.userOnboarding.STEP_ALREADY_PASSED);
    }

    if (onboarding.verificationCode === UserOnboardingStepStatus.PENDING) {
      throw new ConflictException(responses.userOnboarding.VERIFICATION_CODE_MUST_BE_PROVIDED_FIRST);
    }

    const hashedPassword = hashSync(dto.password, 7);

    const user = await this.db.user.create({
      data: {
        email: onboarding.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        avatar: null,
        userOnboarding: { connect: { id: userOnboardingId } },
      },
      select: { id: true },
    });

    await this.db.userOnboarding.update({
      where: { id: userOnboardingId },
      data: { info: UserOnboardingStepStatus.COMPLETED },
    });

    const token = this.jwtService.generateToken({ id: user.id });

    return { token };
  }

  async login({ email, password }: LoginDto) {
    await new Promise((r) => {
      setTimeout(() => {
        r(null);
      }, 1700);
    });
    const user = await this.db.user.findFirst({
      where: { email },
      select: { id: true, password: true, provider: true },
    });

    if (!user) throw new ConflictException(responses.auth.USER_NOT_EXISTS);

    if (user.provider !== 'email') throw new ConflictException(responses.provider.PROVIDER_NOT_SUPPORTED);

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) throw new ConflictException(responses.auth.INVALID_PASSWORD);

    const token = this.jwtService.generateToken({ id: user.id });

    return { token };
  }

  async signWithGoogle(dto: SignWithGoogleBodyPayloadDto) {
    const googleUser = await this.getUserByToken(dto.token);

    const userExists = await this.db.user.findFirst({ where: { email: googleUser.email } });

    if (!userExists) {
      const user = await this.db.user.create({
        data: {
          email: googleUser.email,
          password: null,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          avatar: googleUser.picture,
          provider: 'google',
        },
        select: { id: true },
      });

      const token = this.jwtService.generateToken({ id: user.id });

      return { token };
    } else {
      const token = this.jwtService.generateToken({ id: userExists.id });

      return { token };
    }
  }

  async getMe(id: string) {
    const user = await this.db.user.findFirstOrThrow({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        accountStatus: true,
      },
    });

    if (user.accountStatus == 'banned') throw new ConflictException(responses.user.YOUR_ACCOUNT_BANNED);

    return user;
  }
}
