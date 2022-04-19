import { PurchaseOrderEntity } from '@entities/purchase-order.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseOrderEntity)
export class PurchaseOrderRepository extends Repository<PurchaseOrderEntity> {}
