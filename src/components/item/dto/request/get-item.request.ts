import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetItemRequest {
  @IsNumber()
  @Transform((value) => Number(value.value))
  @IsNotEmpty()
  id: number;
}
