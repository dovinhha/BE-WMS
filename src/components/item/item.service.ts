import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTypeRepository } from '@repositories/item-type.repository';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { ItemRepository } from '@repositories/item.repository';
import { ApiError } from '@utils/api.error';
import { PagingResponse } from '@utils/paging.response';
import { ResponseBuilder } from '@utils/response-builder';
import { plainToClass } from 'class-transformer';
import { ListItemQuery } from './dto/query/list-item.query';
import { CreateItemRequest } from './dto/request/create-item.request';
import { GetItemRequest } from './dto/request/get-item.request';
import { UpdateItemRequest } from './dto/request/update-item.request';
import { GetItemResponse } from './dto/response/get-item.response';
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private readonly itemRepository: ItemRepository,

    @InjectRepository(ItemUnitRepository)
    private readonly itemUnitRepository: ItemUnitRepository,

    @InjectRepository(ItemTypeRepository)
    private readonly itemTypeRepository: ItemTypeRepository,
  ) {}

  async create(request: CreateItemRequest): Promise<any> {
    const itemByCode = await this.itemRepository.findOne({
      code: request.code,
    });

    if (itemByCode) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(ResponseMessageEnum.CODE_INVALID)
        .build();
    }

    const itemType = await this.itemTypeRepository.findOne(request.itemTypeId);

    if (!itemType) {
      return new ApiError(
        ResponseCodeEnum.NOT_FOUND,
        ResponseMessageEnum.NOT_FOUND,
      ).toResponse();
    }

    const itemUnit = await this.itemUnitRepository.findOne(request.itemUnitId);

    if (!itemUnit) {
      return new ApiError(
        ResponseCodeEnum.NOT_FOUND,
        ResponseMessageEnum.NOT_FOUND,
      ).toResponse();
    }

    const itemEntity = this.itemRepository.createEntity(request);
    const item = await this.itemRepository.save(itemEntity);

    return new ResponseBuilder(item)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async update(request: UpdateItemRequest): Promise<any> {
    const item = await this.itemRepository.findOne(request.id);

    if (!item) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const itemType = await this.itemTypeRepository.findOne(request.itemTypeId);

    if (!itemType) {
      return new ApiError(
        ResponseCodeEnum.NOT_FOUND,
        ResponseMessageEnum.NOT_FOUND,
      ).toResponse();
    }

    const itemUnit = await this.itemUnitRepository.findOne(request.itemUnitId);

    if (!itemUnit) {
      return new ApiError(
        ResponseCodeEnum.NOT_FOUND,
        ResponseMessageEnum.NOT_FOUND,
      ).toResponse();
    }

    for (let key in request) {
      item[key] = request[key];
    }

    await this.itemRepository.save(item);

    const itemRes = await this.itemRepository.detail(request.id);

    const dataReturn = plainToClass(GetItemResponse, itemRes, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async detail(request: GetItemRequest): Promise<any> {
    const item = await this.itemRepository.detail(request.id);

    if (!item) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const dataReturn = plainToClass(GetItemResponse, item, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async delete(request: GetItemRequest): Promise<any> {
    const item = await this.itemRepository.findOne(request.id);

    if (!item) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    item.deletedAt = new Date();

    await this.itemRepository.save(item);

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async list(request: ListItemQuery): Promise<any> {
    const [items, count] = await this.itemRepository.list(request);

    const itemsReturn = plainToClass(GetItemResponse, items, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder<PagingResponse>({
      items: itemsReturn,
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
