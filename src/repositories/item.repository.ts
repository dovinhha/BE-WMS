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
        `JSON_AGG(JSON_BUILD_OBJECT(
        'id', qb1.id, 'code', qb1.code, 'name', qb1.name
      )) AS "itemUnit"`,
        `JSON_AGG(JSON_BUILD_OBJECT(
        'id', qb2.id, 'code', qb2.code, 'name', qb2.name
      )) AS "itemType"`,
      ])
      .innerJoin(
        (qb) =>
          qb
            .select(['iu.id AS id', 'iu.name AS name', 'iu.code AS code'])
            .from(ItemUnitEntity, 'iu'),
        'qb1',
        'qb1.id = i.item_unit_id',
      )
      .innerJoin(
        (qb) =>
          qb
            .select(['it.id AS id', 'it.name AS name', 'it.code AS code'])
            .from(ItemTypeEntity, 'it'),
        'qb2',
        'qb2.id = i.item_type_id',
      );
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
        `JSON_AGG(JSON_BUILD_OBJECT(
        'id', qb1.id, 'code', qb1.code, 'name', qb1.name
      )) AS "itemUnit"`,
        `JSON_AGG(JSON_BUILD_OBJECT(
        'id', qb2.id, 'code', qb2.code, 'name', qb2.name
      )) AS "itemType"`,
      ])
      .innerJoin(
        (qb) =>
          qb
            .select(['iu.id AS id', 'iu.name AS name', 'iu.code AS code'])
            .from(ItemUnitEntity, 'iu'),
        'qb1',
        'qb1.id = i.item_unit_id',
      )
      .innerJoin(
        (qb) =>
          qb
            .select(['it.id AS id', 'it.name AS name', 'it.code AS code'])
            .from(ItemTypeEntity, 'it'),
        'qb2',
        'qb2.id = i.item_type_id',
      )
      .where('i.id = :id', { id })
      .getRawOne();
  }
}
