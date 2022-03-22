import { PaginationQuery } from '@utils/pagination.query';
import { IsOptional, IsString } from 'class-validator';

export class GetCategoriesQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  keyword: string;
}
