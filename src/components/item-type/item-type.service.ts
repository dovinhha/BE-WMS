import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTypeRepository } from '@repositories/item-type.repository';
import { DetailRequest } from '@utils/detail.request';
import { PagingResponse } from '@utils/paging.response';
import { ResponseBuilder } from '@utils/response-builder';
import { plainToClass } from 'class-transformer';
import { ListItemTypeQuery } from './dto/query/list-item-type.query';
import { CreateItemTypeRequest } from './dto/request/create-item-type.request';
import { UpdateItemTypeRequest } from './dto/request/update-item-type.request';
import { GetItemTypeResponse } from './dto/response/get-item-type.response';
@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemTypeRepository)
    private readonly itemTypeRepository: ItemTypeRepository,
  ) {}

  async create(request: CreateItemTypeRequest): Promise<any> {
    const itemTypeByCode = await this.itemTypeRepository.findOne({
      code: request.code,
    });

    if (itemTypeByCode) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(ResponseMessageEnum.CODE_INVALID)
        .build();
    }

    const itemTypeEntity = this.itemTypeRepository.createEntity(request);
    const itemType = await this.itemTypeRepository.save(itemTypeEntity);

    return new ResponseBuilder(itemType)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async update(request: UpdateItemTypeRequest & DetailRequest): Promise<any> {
    const itemType = await this.itemTypeRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemType) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    for (let key in request) {
      itemType[key] = request[key];
    }

    await this.itemTypeRepository.save(itemType);

    const dataReturn = plainToClass(GetItemTypeResponse, itemType, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async detail(request: DetailRequest): Promise<any> {
    const itemType = await this.itemTypeRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemType) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const dataReturn = plainToClass(GetItemTypeResponse, itemType, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async delete(request: DetailRequest): Promise<any> {
    const itemType = await this.itemTypeRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!itemType) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    itemType.deletedAt = new Date();

    await this.itemTypeRepository.save(itemType);

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async list(request: ListItemTypeQuery): Promise<any> {
    const [itemTypes, count] = await this.itemTypeRepository.list(request);

    const itemTypeReturn = plainToClass(GetItemTypeResponse, itemTypes, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder<PagingResponse>({
      items: itemTypeReturn,
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
