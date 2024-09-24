import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import { UserOnboardingService } from './root.service';

import { PassVerificationCodeStepBodyPayloadDto } from './dto/pass-verification-code-step.body.dto';
import { PassInfoStepBodyDto } from './dto/pass-info-step.body.dto';
import { StartRegisterDto } from './dto/start-register.dto';
import { LoginDto } from './dto/login.dto';

import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/jwt/guards/jwt.guard';
import { responses } from 'src/shared/responses/responses';
import { cookies } from './constants';

@Controller('auth')
export class UserOnboardingController {
  constructor(private readonly userOnboardingService: UserOnboardingService) {}

  @Post('/start-register')
  async startRegister(@Res({ passthrough: true }) res, @Body() dto: StartRegisterDto) {
    const { token } = await this.userOnboardingService.startRegister(dto);

    res.cookie(cookies.jwt.userOnboarding.key, token, cookies.jwt.userOnboarding);

    return { success: true };
  }

  @Post('/verification-code-step')
  @UseGuards(JwtAuthGuard)
  passVerificationCodeStep(@User('id') userOnboardingId: string, @Body() dto: PassVerificationCodeStepBodyPayloadDto) {
    return this.userOnboardingService.passVerificationCodeStep(userOnboardingId, dto);
  }

  @Post('/info-step')
  @UseGuards(JwtAuthGuard)
  async passInfoStep(
    @User('id') userOnboardingId: string,
    @Body() dto: PassInfoStepBodyDto,
    @Res({ passthrough: true }) res,
  ) {
    const { token } = await this.userOnboardingService.passInfoStep(userOnboardingId, dto);

    res.cookie('token', token);

    return { ...responses.userOnboarding.INFO_PASSED };
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res) {
    const { token } = await this.userOnboardingService.login(body);

    res.cookie('token', token);

    return { success: true };
  }
}
