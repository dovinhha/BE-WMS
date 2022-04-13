import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateItemRequest {
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
