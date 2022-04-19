import { SaleOrderEntity } from '@entities/sale-order.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SaleOrderEntity)
export class SaleOrderRepository extends Repository<SaleOrderEntity> {}
