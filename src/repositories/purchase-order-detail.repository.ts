import { PurchaseOrderDetailEntity } from '@entities/purchase-order-detail.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseOrderDetailEntity)
export class PurchaseOrderDetailRepository extends Repository<PurchaseOrderDetailEntity> {}
