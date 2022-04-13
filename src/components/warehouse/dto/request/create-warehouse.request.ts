import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class WarehouseItem {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateWarehouseRequest {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => WarehouseItem)
  @ArrayUnique<WarehouseItem>((item) => item.itemId)
  @ArrayNotEmpty()
  items: WarehouseItem[];
}
