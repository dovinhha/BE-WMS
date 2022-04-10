import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@components/auth/auth.module';
import { ItemUnitModule } from '@components/item-unit/item-unit.module';
import { ItemTypeModule } from '@components/item-type/item-type.module';
import { ItemModule } from '@components/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ItemUnitModule,
    ItemTypeModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
