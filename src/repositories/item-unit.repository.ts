import { EntityRepository, Repository } from 'typeorm';
import { ItemUnitEntity } from '@entities/item-unit.entity';
import { CreateItemUnitRequest } from '@components/item-unit/dto/request/create-item-unit.request';
import { ListItemUnitQuery } from '@components/item-unit/dto/query/list-item-unit.query';

@EntityRepository(ItemUnitEntity)
export class ItemUnitRepository extends Repository<ItemUnitEntity> {
  createEntity(request: CreateItemUnitRequest): ItemUnitEntity {
    const entity = new ItemUnitEntity();
    entity.code = request.code;
    entity.name = request.name;
    entity.description = request.description;
    return entity;
  }

  async list(request: ListItemUnitQuery): Promise<[ItemUnitEntity[], number]> {
    const query = this.createQueryBuilder().where('deleted_at IS NULL');
    const data = await query.offset(request.skip).limit(request.take).getMany();
    const count = await query.getCount();

    return [data, count];
  }
}
