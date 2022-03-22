import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
