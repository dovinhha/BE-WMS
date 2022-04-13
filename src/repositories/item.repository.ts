import { EntityRepository, Repository } from 'typeorm';
import { ItemEntity } from '@entities/item.entity';
import { CreateItemRequest } from '@components/item/dto/request/create-item.request';
import { ListItemQuery } from '@components/item/dto/query/list-item.query';
import { ItemUnitEntity } from '@entities/item-unit.entity';
import { ItemTypeEntity } from '@entities/item-type.entity';

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
  createEntity(request: CreateItemRequest): ItemEntity {
    const entity = new ItemEntity();
    entity.code = request.code;
    entity.name = request.name;
    entity.description = request.description;
    entity.price = request.price;
    entity.itemTypeId = request.itemTypeId;
    entity.itemUnitId = request.itemUnitId;
    return entity;
  }
  async list(request: ListItemQuery): Promise<[any[], number]> {
    const query = this.createQueryBuilder('i')
      .select([
        'i.id AS id',
        'i.code AS code',
        'i.name AS name',
        'i.description AS description',
        'i.price AS price',
        'i.created_at AS "createdAt"',
        'i.updated_at AS "updatedAt"',
        `JSON_BUILD_OBJECT(
        'id', iu.id, 'code', iu.code, 'name', iu.name
        ) AS "itemUnit"`,
        `JSON_BUILD_OBJECT(
        'id', it.id, 'code', it.code, 'name', it.name
        ) AS "itemType"`,
      ])
      .innerJoin(ItemUnitEntity, 'iu', 'iu.id = i.item_unit_id')
      .innerJoin(ItemTypeEntity, 'it', 'it.id = i.item_type_id')
      .where('i.deleted_at IS NULL')
      .groupBy('i.id')
      .addGroupBy('iu.id')
      .addGroupBy('it.id');
    const data = await query
      .offset(request.skip)
      .limit(request.take)
      .getRawMany();
    const count = await query.getCount();
    return [data, count];
  }

  detail(id: number): Promise<any> {
    return this.createQueryBuilder('i')
      .select([
        'i.id AS id',
        'i.code AS code',
        'i.name AS name',
        'i.description AS description',
        'i.price AS price',
        'i.created_at AS "createdAt"',
        'i.updated_at AS "updatedAt"',
        `JSON_BUILD_OBJECT(
          'id', iu.id, 'code', iu.code, 'name', iu.name
          ) AS "itemUnit"`,
        `JSON_BUILD_OBJECT(
          'id', it.id, 'code', it.code, 'name', it.name
          ) AS "itemType"`,
      ])
      .innerJoin(ItemUnitEntity, 'iu', 'iu.id = i.item_unit_id')
      .innerJoin(ItemTypeEntity, 'it', 'it.id = i.item_type_id')
      .where('i.deleted_at IS NULL')
      .andWhere('i.id = :id', { id })
      .andWhere('i.deleted_at IS NULL')
      .getRawOne();
  }
}
