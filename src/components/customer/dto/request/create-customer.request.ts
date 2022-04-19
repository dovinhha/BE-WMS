import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCustomerRequest {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  adddress: string;

  @IsString()
  @IsOptional()
  description: string;
}
