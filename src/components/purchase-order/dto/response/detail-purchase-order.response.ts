import { Expose, Type } from 'class-transformer';
import { ListPurchaseOrderResponse } from './list-purchase-order.response';

class DetailPurchaseOrder {
  @Expose()
  id: number;

  @Expose()
  itemId: number;

  @Expose()
  itemName: string;

  @Expose()
  warehouseId: number;

  @Expose()
  planQuantity: number;

  @Expose()
  actualQuantity: number;

  @Expose()
  price: number;
}

export class DetailPurchaseOrderResponse extends ListPurchaseOrderResponse {
  @Type(() => DetailPurchaseOrder)
  @Expose()
  details: DetailPurchaseOrder[];
}
