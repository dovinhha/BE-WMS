import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateItemTypeRequest {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  code: string;

  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
