import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { DetailRequest } from '@utils/detail.request';
import { PagingResponse } from '@utils/paging.response';
import { ResponseBuilder } from '@utils/response-builder';
import { plainToClass } from 'class-transformer';
import { CreateWarehouseRequest } from './dto/request/create-warehouse.request';
@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(ItemUnitRepository)
    private readonly itemUnitRepository: ItemUnitRepository,
  ) {}

  async create(request: CreateWarehouseRequest): Promise<any> {
    const itemUnitByCode = await this.itemUnitRepository.findOne({
      code: request.code,
    });

    if (itemUnitByCode) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(ResponseMessageEnum.CODE_INVALID)
        .build();
    }

    const itemUnitEntity = this.itemUnitRepository.createEntity(request);
    const itemUnit = await this.itemUnitRepository.save(itemUnitEntity);

    return new ResponseBuilder(itemUnit)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  // async update(request: UpdateItemUnitRequest & DetailRequest): Promise<any> {
  //   const itemUnit = await this.itemUnitRepository.findOne({
  //     id: request.id,
  //     deletedAt: null,
  //   });

  //   if (!itemUnit) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.NOT_FOUND)
  //       .withMessage(ResponseMessageEnum.NOT_FOUND)
  //       .build();
  //   }

  //   for (let key in request) {
  //     itemUnit[key] = request[key];
  //   }

  //   await this.itemUnitRepository.save(itemUnit);

  //   const dataReturn = plainToClass(GetItemUnitResponse, itemUnit, {
  //     excludeExtraneousValues: true,
  //   });

  //   return new ResponseBuilder(dataReturn)
  //     .withCode(ResponseCodeEnum.SUCCESS)
  //     .withMessage(ResponseMessageEnum.SUCCESS)
  //     .build();
  // }

  // async detail(request: DetailRequest): Promise<any> {
  //   const itemUnit = await this.itemUnitRepository.findOne({
  //     id: request.id,
  //     deletedAt: null,
  //   });

  //   if (!itemUnit) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.NOT_FOUND)
  //       .withMessage(ResponseMessageEnum.NOT_FOUND)
  //       .build();
  //   }

  //   const dataReturn = plainToClass(GetItemUnitResponse, itemUnit, {
  //     excludeExtraneousValues: true,
  //   });

  //   return new ResponseBuilder(dataReturn)
  //     .withCode(ResponseCodeEnum.SUCCESS)
  //     .withMessage(ResponseMessageEnum.SUCCESS)
  //     .build();
  // }

  // async delete(request: DetailRequest): Promise<any> {
  //   const itemUnit = await this.itemUnitRepository.findOne({
  //     id: request.id,
  //     deletedAt: null,
  //   });

  //   if (!itemUnit) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.NOT_FOUND)
  //       .withMessage(ResponseMessageEnum.NOT_FOUND)
  //       .build();
  //   }

  //   itemUnit.deletedAt = new Date();

  //   await this.itemUnitRepository.save(itemUnit);

  //   return new ResponseBuilder()
  //     .withCode(ResponseCodeEnum.SUCCESS)
  //     .withMessage(ResponseMessageEnum.SUCCESS)
  //     .build();
  // }

  // async list(request: ListItemUnitQuery): Promise<any> {
  //   const [itemUnits, count] = await this.itemUnitRepository.list(request);

  //   const itemUnitReturn = plainToClass(GetItemUnitResponse, itemUnits, {
  //     excludeExtraneousValues: true,
  //   });

  //   return new ResponseBuilder<PagingResponse>({
  //     items: itemUnitReturn,
  //     meta: {
  //       total: count,
  //       page: request.page,
  //     },
  //   })
  //     .withCode(ResponseCodeEnum.SUCCESS)
  //     .withMessage(ResponseMessageEnum.SUCCESS)
  //     .build();
  // }
}
