import { WarehouseStockEntity } from '@entities/warehouse-stock.entity';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseStockRepository } from '@repositories/warehouse-stock.repository';
import { WarehouseRepository } from '@repositories/warehouse.repository';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehouseRepository, WarehouseStockRepository]),
  ],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    {
      provide: getRepositoryToken(WarehouseStockEntity),
      useClass: WarehouseStockRepository,
    },
  ],
})
export class WarehouseModule {}
