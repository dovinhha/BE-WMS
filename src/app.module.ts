import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@components/auth/auth.module';
import { CategoryModule } from '@components/category/category.module';
import { BranchModule } from './components/branch/branch.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, CategoryModule, BranchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
