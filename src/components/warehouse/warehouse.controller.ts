import { JwtAuthGuard } from '@components/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DetailRequest } from '@utils/detail.request';
import { ListWarehouseQuery } from './dto/query/list-warehouse.query';
import { CreateWarehouseRequest } from './dto/request/create-warehouse.request';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateWarehouseRequest) {
    return this.warehouseService.create(request);
  }

  @Get()
  list(@Query() request: ListWarehouseQuery) {
    return this.warehouseService.list(request);
  }

  // @Get(':id')
  // detail(@Param() request: DetailRequest) {
  //   return this.itemUnitService.detail(request);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put(':id')
  // update(
  //   @Body() request: UpdateItemUnitRequest,
  //   @Param() param: DetailRequest,
  // ) {
  //   return this.itemUnitService.update({ ...request, ...param });
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.warehouseService.delete(request);
  }
}
