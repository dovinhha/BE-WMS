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

class SaleOrderItem {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  warehouseId: number;

  @IsNumber()
  @IsNotEmpty()
  planQuantity: number;
}

export class UpdateSaleOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayUnique<SaleOrderItem>((item) => item.itemId)
  @ValidateNested({ each: true })
  @Type(() => SaleOrderItem)
  @ArrayNotEmpty()
  items: SaleOrderItem[];
}
