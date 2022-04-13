import { JwtAuthGuard } from '@components/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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

  // @Get()
  // list(@Query() request: ListItemUnitQuery) {
  //   return this.itemUnitService.list(request);
  // }

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

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // delete(@Param() request: DetailRequest) {
  //   return this.itemUnitService.delete(request);
  // }
}
