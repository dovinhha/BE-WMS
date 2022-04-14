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
}

export class UpdateWarehouseRequest {
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
