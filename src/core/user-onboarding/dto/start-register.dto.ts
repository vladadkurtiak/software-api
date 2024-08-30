import { IsEmail, IsNotEmpty } from 'class-validator';

export class StartRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
