import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from '@repositories/customer.repository';
import { DetailRequest } from '@utils/detail.request';
import { PagingResponse } from '@utils/paging.response';
import { ResponseBuilder } from '@utils/response-builder';
import { plainToClass } from 'class-transformer';
import { ListcustomerQuery } from './dto/query/list-customer.query';
import { CreateCustomerRequest } from './dto/request/create-customer.request';
import { UpdateCustomerRequest } from './dto/request/update-customer.request';
import { GetItemUnitResponse } from './dto/response/get-item-unit.response';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(request: CreateCustomerRequest): Promise<any> {
    const itemUnitEntity = this.customerRepository.createEntity(request);
    const itemUnit = await this.customerRepository.save(itemUnitEntity);

    return new ResponseBuilder(itemUnit)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async update(request: UpdateCustomerRequest & DetailRequest): Promise<any> {
    const itemUnit = await this.customerRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemUnit) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    for (let key in request) {
      itemUnit[key] = request[key];
    }

    await this.customerRepository.save(itemUnit);

    const dataReturn = plainToClass(GetItemUnitResponse, itemUnit, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async detail(request: DetailRequest): Promise<any> {
    const itemUnit = await this.customerRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemUnit) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const dataReturn = plainToClass(GetItemUnitResponse, itemUnit, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async delete(request: DetailRequest): Promise<any> {
    const itemUnit = await this.customerRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemUnit) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    itemUnit.deletedAt = new Date();

    await this.customerRepository.save(itemUnit);

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async list(request: ListcustomerQuery): Promise<any> {
    const [itemUnits, count] = await this.customerRepository.list(request);

    const itemUnitReturn = plainToClass(GetItemUnitResponse, itemUnits, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder<PagingResponse>({
      items: itemUnitReturn,
      meta: {
        total: count,
        page: request.page,
      },
    })
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }
}
