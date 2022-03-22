import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

export class PaginationQuery {
  @Allow()
  @Transform((value) => Number(value.value) || 1)
  page?: number;

  @Allow()
  limit?: number;

  get take(): number {
    const limit = Number(this.limit) || 10;

    return limit > 0 && limit <= 100 ? limit : 10;
  }

  get skip(): number {
    const page = (Number(this.page) || 1) - 1;

    return (page < 0 ? 0 : page) * this.take;
  }
}
