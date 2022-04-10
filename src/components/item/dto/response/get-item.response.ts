import { Expose, Type } from 'class-transformer';

class ItemResponse {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class GetItemResponse {
  @Expose()
  id: number;

  @Type(() => ItemResponse)
  @Expose()
  itemUnit: ItemResponse;

  @Type(() => ItemResponse)
  @Expose()
  itemType: ItemResponse;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
