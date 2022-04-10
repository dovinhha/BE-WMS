import { EntityRepository, Repository } from 'typeorm';
import { CreateItemUnitRequest } from '@components/item-unit/dto/request/create-item-unit.request';
import { ListItemUnitQuery } from '@components/item-unit/dto/query/list-item-unit.query';
import { ItemTypeEntity } from '@entities/item-type.entity';

@EntityRepository(ItemTypeEntity)
export class ItemTypeRepository extends Repository<ItemTypeEntity> {
  createEntity(request: CreateItemUnitRequest): ItemTypeEntity {
    const entity = new ItemTypeEntity();
    entity.code = request.code;
    entity.name = request.name;
    entity.description = request.description;
    return entity;
  }

  async list(request: ListItemUnitQuery): Promise<[ItemTypeEntity[], number]> {
    const query = this.createQueryBuilder();
    const data = await query.offset(request.skip).limit(request.take).getMany();
    const count = await query.getCount();

    return [data, count];
  }
}
