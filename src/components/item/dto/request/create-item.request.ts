import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateItemRequest {
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

  @IsInt()
  @IsOptional()
  price: number;

  @IsInt()
  @IsNotEmpty()
  itemUnitId: number;

  @IsInt()
  @IsNotEmpty()
  itemTypeId: number;
}
