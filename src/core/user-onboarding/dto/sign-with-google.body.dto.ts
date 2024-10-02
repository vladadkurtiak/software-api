import { IsNotEmpty, IsString } from 'class-validator';

export class SignWithGoogleBodyPayloadDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
