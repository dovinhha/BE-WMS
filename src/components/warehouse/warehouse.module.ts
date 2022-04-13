import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemUnitRepository])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
