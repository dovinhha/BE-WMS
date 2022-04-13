import { EntityRepository, Repository } from 'typeorm';
import { WarehouseEntity } from '@entities/warehouse.entity';
import { CreateWarehouseRequest } from '@components/warehouse/dto/request/create-warehouse.request';
import { ListWarehouseQuery } from '@components/warehouse/dto/query/list-warehouse.query';

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
}
