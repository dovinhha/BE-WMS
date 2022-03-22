import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCategoryQuery {
  @IsNotEmpty()
  @Transform((value) => Number(value.value))
  @IsNumber()
  id: number;
}
