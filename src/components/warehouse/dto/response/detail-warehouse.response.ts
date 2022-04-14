import { Expose, Type } from 'class-transformer';
import { ListWarehoseResponse } from './list-warehouse.response';

class ItemResponse {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class DetailWarehouseResponse extends ListWarehoseResponse {
  @Type(() => ItemResponse)
  @Expose()
  items: ItemResponse[];
}
