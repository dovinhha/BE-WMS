import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrderDetailRepository } from '@repositories/sale-order-detail.repository';
import { SaleOrderRepository } from '@repositories/sale-order.repository';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrderService } from './sale-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleOrderRepository, SaleOrderDetailRepository]),
  ],
  controllers: [SaleOrderController],
  providers: [
    SaleOrderService,
    {
      provide: getRepositoryToken(SaleOrderDetailRepository),
      useClass: SaleOrderDetailRepository,
    },
  ],
})
export class SaleOrderModule {}
