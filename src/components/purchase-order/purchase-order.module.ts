import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderDetailRepository } from '@repositories/purchase-order-detail.repository';
import { PurchaseOrderRepository } from '@repositories/purchase-order.repository';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrderRepository,
      PurchaseOrderDetailRepository,
    ]),
  ],
  controllers: [PurchaseOrderController],
  providers: [
    PurchaseOrderService,
    {
      provide: getRepositoryToken(PurchaseOrderDetailRepository),
      useClass: PurchaseOrderDetailRepository,
    },
  ],
})
export class PurchaseOrderModule {}
