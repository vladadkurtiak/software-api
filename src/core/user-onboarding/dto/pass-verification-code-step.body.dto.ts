import { IsNotEmpty, IsString } from 'class-validator';

export class PassVerificationCodeStepBodyPayloadDto {
  @IsString()
  @IsNotEmpty({ message: 'Code should not be empty' })
  code: string;
}
