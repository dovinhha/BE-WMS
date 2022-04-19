import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
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

export class CreateSaleOrderRequest {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayUnique<SaleOrderItem>((item) => item.itemId)
  @ValidateNested({ each: true })
  @Type(() => SaleOrderItem)
  @ArrayNotEmpty()
  items: SaleOrderItem[];
}
