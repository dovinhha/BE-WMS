import { ResponseCodeEnum } from '@enums/response-code.enum';

export interface ResponsePayload<T> {
  code: ResponseCodeEnum;
  message?: string;
  data?: T;
  meta?: unknown;
  type?: string;
}
