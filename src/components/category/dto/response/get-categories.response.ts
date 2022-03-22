import { Expose } from 'class-transformer';

export class GetCategoriesResponse {
  @Expose()
  name: string;

  @Expose()
  slug: string;
}
