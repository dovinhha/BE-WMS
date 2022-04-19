import { SaleOrderDetailEntity } from '@entities/sale-order-detail.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SaleOrderDetailEntity)
export class SaleOrderDetailRepository extends Repository<SaleOrderDetailEntity> {}
