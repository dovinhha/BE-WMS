import { Expose, Type } from 'class-transformer';
import { ListSaleOrderResponse } from './list-sale-order.response';

class DetailSaleOrder {
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

export class DetailSaleOrderResponse extends ListSaleOrderResponse {
  @Type(() => DetailSaleOrder)
  @Expose()
  details: DetailSaleOrder[];
}
