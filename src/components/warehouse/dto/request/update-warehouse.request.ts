import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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

  @ArrayUnique<WarehouseItem>((item) => item.itemId)
  @ValidateNested({ each: true })
  @Type(() => WarehouseItem)
  @ArrayNotEmpty()
  items: WarehouseItem[];
}
