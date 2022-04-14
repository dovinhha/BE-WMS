import { EntityRepository, Repository } from 'typeorm';
import { WarehouseStockEntity } from '@entities/warehouse-stock.entity';

@EntityRepository(WarehouseStockEntity)
export class WarehouseStockRepository extends Repository<WarehouseStockEntity> {
  public createEntity(
    itemId: number,
    warehouseId: number,
  ): WarehouseStockEntity {
    const entity = new WarehouseStockEntity();
    entity.itemId = itemId;
    entity.warehouseId = warehouseId;
    entity.quantity = 0;
    return entity;
  }
}
