import { ItemTypeModule } from '@components/item-type/item-type.module';
import { ItemUnitModule } from '@components/item-unit/item-unit.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeRepository } from '@repositories/item-type.repository';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { ItemRepository } from '@repositories/item.repository';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository]),
    ItemUnitModule,
    ItemTypeModule,
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemUnitRepository, ItemTypeRepository],
})
export class ItemModule {}
