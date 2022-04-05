import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { ItemUnitController } from './item-unit.controller';
import { ItemUnitService } from './item-unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemUnitRepository])],
  controllers: [ItemUnitController],
  providers: [ItemUnitService],
})
export class ItemUnitModule {}
