import { Expose } from 'class-transformer';

export class ListPurchaseOrderResponse {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  status: number;

  @Expose()
  description: string;

  @Expose()
  importedDate: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
