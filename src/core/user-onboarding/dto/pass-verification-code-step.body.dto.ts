import { IsNotEmpty, IsString } from 'class-validator';

export class PassVerificationCodeStepBodyPayloadDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
