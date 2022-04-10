import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { GetItemRequest } from './get-item.request';

export class UpdateItemRequest extends GetItemRequest {
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
