import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { WarehouseStockRepository } from '@repositories/warehouse-stock.repository';
import { WarehouseRepository } from '@repositories/warehouse.repository';
import { DetailRequest } from '@utils/detail.request';
import { PagingResponse } from '@utils/paging.response';
import { ResponseBuilder } from '@utils/response-builder';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { ListWarehouseQuery } from './dto/query/list-warehouse.query';
import { CreateWarehouseRequest } from './dto/request/create-warehouse.request';
import { UpdateWarehouseRequest } from './dto/request/update-warehouse.request';
import { DetailWarehouseResponse } from './dto/response/detail-warehouse.response';
import { ListWarehoseResponse } from './dto/response/list-warehouse.response';
@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseRepository)
    private readonly warehouseRepository: WarehouseRepository,

    @InjectRepository(WarehouseStockRepository)
    private readonly warehouseStockRepository: WarehouseStockRepository,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(request: CreateWarehouseRequest): Promise<any> {
    const warehouseByCode = await this.warehouseRepository.findOne({
      code: request.code,
    });

    if (warehouseByCode) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(ResponseMessageEnum.CODE_INVALID)
        .build();
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const warehouseEntity = this.warehouseRepository.createEntity(request);
      const warehouse = await queryRunner.manager.save(warehouseEntity);
      const warehouseStockEntities = request.items.map((item) =>
        this.warehouseStockRepository.createEntity(item.itemId, warehouse.id),
      );

      await queryRunner.manager.save(warehouseStockEntities);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err?.message)
        .build();
    } finally {
      await queryRunner.release();
    }

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.CREATED)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async update(request: UpdateWarehouseRequest & DetailRequest): Promise<any> {
    const warehouse = await this.warehouseRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!warehouse) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    for (let key in request) {
      warehouse[key] = request[key];
    }

    const warehouseStocks = await this.warehouseStockRepository.find({
      warehouseId: warehouse.id,
    });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(warehouse);
      await queryRunner.manager.remove(warehouseStocks);
      const warehouseStockEntities = request.items.map((item) =>
        this.warehouseStockRepository.createEntity(item.itemId, warehouse.id),
      );

      await queryRunner.manager.save(warehouseStockEntities);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err?.message)
        .build();
    } finally {
      await queryRunner.release();
    }

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async detail(request: DetailRequest): Promise<any> {
    const warehouse = await this.warehouseRepository.detail(request);

    if (!warehouse) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const dataReturn = plainToClass(DetailWarehouseResponse, warehouse, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async delete(request: DetailRequest): Promise<any> {
    const warehouse = await this.warehouseRepository.findOne({
      id: request.id,
      deletedAt: null,
    });

    if (!warehouse) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    warehouse.deletedAt = new Date();

    await this.warehouseRepository.save(warehouse);

    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async list(request: ListWarehouseQuery): Promise<any> {
    const [warehouses, count] = await this.warehouseRepository.list(request);

    const warehouseReturn = plainToClass(ListWarehoseResponse, warehouses, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder<PagingResponse>({
      items: warehouseReturn,
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
