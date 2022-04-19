import { EntityRepository, Repository } from 'typeorm';
import { WarehouseEntity } from '@entities/warehouse.entity';
import { CreateWarehouseRequest } from '@components/warehouse/dto/request/create-warehouse.request';
import { ListWarehouseQuery } from '@components/warehouse/dto/query/list-warehouse.query';
import { DetailRequest } from '@utils/detail.request';
import { WarehouseStockEntity } from '@entities/warehouse-stock.entity';
import { ItemEntity } from '@entities/item.entity';

@EntityRepository(WarehouseEntity)
export class WarehouseRepository extends Repository<WarehouseEntity> {
  public createEntity(request: CreateWarehouseRequest): WarehouseEntity {
    const entity = new WarehouseEntity();
    entity.code = request.code;
    entity.name = request.name;
    entity.description = request.description;
    entity.address = request.address;
    return entity;
  }

  async list(request: ListWarehouseQuery): Promise<[any[], number]> {
    const query = this.createQueryBuilder('w')
      .select([
        'w.id AS id',
        'w.code AS code',
        'w.name AS name',
        'w.description AS description',
        'w.address AS address',
        'w.created_at AS "createdAt"',
        'w.updated_at AS "updatedAt"',
      ])
      .where('w.deleted_at IS NULL');
    const data = await query
      .orderBy('w.created_at', 'DESC')
      .offset(request.skip)
      .limit(request.take)
      .getRawMany();
    const count = await query.getCount();
    return [data, count];
  }

  detail(request: DetailRequest): Promise<any> {
    return this.createQueryBuilder('w')
      .select([
        'w.id AS id',
        'w.code AS code',
        'w.name AS name',
        'w.description AS description',
        'w.address AS address',
        'w.created_at AS "createdAt"',
        'w.updated_at AS "updatedAt"',
        `JSON_AGG(JSON_BUILD_OBJECT(
          'id', qb.item_id, 'code', qb.code, 'name', qb.name
        )) AS "items"`,
      ])
      .leftJoin(
        (qb) =>
          qb
            .select([
              'ws.item_id AS item_id',
              'i.code AS code',
              'i.name AS name',
              'ws.warehouse_id AS warehouse_id',
            ])
            .from(WarehouseStockEntity, 'ws')
            .innerJoin(ItemEntity, 'i', 'i.id = ws.item_id')
            .where('ws.warehouse_id = :id', { id: request.id }),
        'qb',
        'qb.warehouse_id = w.id',
      )
      .where('w.id = :id', { id: request.id })
      .andWhere('w.deleted_at IS NULL')
      .groupBy('w.id')
      .getRawOne();
  }
}
