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

class PurchaseOrderItem {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  warehouseId: number;

  @IsNumber()
  @IsNotEmpty()
  planQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreatePurchaseOrderRequest {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayUnique<PurchaseOrderItem>((item) => item.itemId)
  @ValidateNested({ each: true })
  @Type(() => PurchaseOrderItem)
  @ArrayNotEmpty()
  items: PurchaseOrderItem[];
}
