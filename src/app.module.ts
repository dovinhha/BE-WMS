import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@components/auth/auth.module';
import { ItemUnitModule } from '@components/item-unit/item-unit.module';
import { ItemTypeModule } from '@components/item-type/item-type.module';
import { ItemModule } from '@components/item/item.module';
import { WarehouseModule } from '@components/warehouse/warehouse.module';
import { PurchaseOrderModule } from '@components/purchase-order/purchase-order.module';
import { CustomerModule } from '@components/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ItemUnitModule,
    ItemTypeModule,
    ItemModule,
    WarehouseModule,
    PurchaseOrderModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
