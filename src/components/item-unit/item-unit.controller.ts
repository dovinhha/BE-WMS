import { JwtAuthGuard } from '@components/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListItemUnitQuery } from './dto/query/list-item-unit.query';
import { CreateItemUnitRequest } from './dto/request/create-item-unit.request';
import { GetItemUnitRequest } from './dto/request/get-item-unit.request';
import { UpdateItemUnitRequest } from './dto/request/update-item-unit.request';
import { ItemUnitService } from './item-unit.service';

@Controller('item-unit')
export class ItemUnitController {
  constructor(private itemUnitService: ItemUnitService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateItemUnitRequest) {
    return this.itemUnitService.create(request);
  }

  @Get()
  list(@Query() request: ListItemUnitQuery) {
    return this.itemUnitService.list(request);
  }

  @Get(':id')
  detail(@Param() request: GetItemUnitRequest) {
    return this.itemUnitService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() request: UpdateItemUnitRequest,
    @Param() param: GetItemUnitRequest,
  ) {
    return this.itemUnitService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: GetItemUnitRequest) {
    return this.itemUnitService.delete(request);
  }
}
