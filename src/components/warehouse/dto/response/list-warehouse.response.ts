import { Expose } from 'class-transformer';

export class ListWarehoseResponse {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  address: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
