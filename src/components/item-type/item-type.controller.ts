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
import { DetailRequest } from '@utils/detail.request';
import { ListItemTypeQuery } from './dto/query/list-item-type.query';
import { CreateItemTypeRequest } from './dto/request/create-item-type.request';
import { UpdateItemTypeRequest } from './dto/request/update-item-type.request';
import { ItemTypeService } from './item-type.service';

@Controller('item-type')
export class ItemTypeController {
  constructor(private itemTypeService: ItemTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateItemTypeRequest) {
    return this.itemTypeService.create(request);
  }

  @Get()
  list(@Query() request: ListItemTypeQuery) {
    return this.itemTypeService.list(request);
  }

  @Get(':id')
  detail(@Param() request: DetailRequest) {
    return this.itemTypeService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() request: UpdateItemTypeRequest,
    @Param() param: DetailRequest,
  ) {
    return this.itemTypeService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.itemTypeService.delete(request);
  }
}
