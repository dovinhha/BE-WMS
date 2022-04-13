import { ItemTypeEntity } from '@entities/item-type.entity';
import { ItemUnitEntity } from '@entities/item-unit.entity';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeRepository } from '@repositories/item-type.repository';
import { ItemUnitRepository } from '@repositories/item-unit.repository';
import { ItemRepository } from '@repositories/item.repository';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemRepository,
      ItemTypeRepository,
      ItemUnitRepository,
    ]),
  ],
  controllers: [ItemController],
  providers: [
    ItemService,
    {
      provide: getRepositoryToken(ItemUnitEntity),
      useClass: ItemUnitRepository,
    },
    {
      provide: getRepositoryToken(ItemTypeEntity),
      useClass: ItemTypeRepository,
    },
  ],
})
export class ItemModule {}
