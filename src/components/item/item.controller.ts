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
import { ListItemQuery } from './dto/query/list-item.query';
import { CreateItemRequest } from './dto/request/create-item.request';
import { UpdateItemRequest } from './dto/request/update-item.request';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateItemRequest) {
    return this.itemService.create(request);
  }

  @Get()
  list(@Query() request: ListItemQuery) {
    return this.itemService.list(request);
  }

  @Get(':id')
  detail(@Param() request: DetailRequest) {
    return this.itemService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() request: UpdateItemRequest, @Param() param: DetailRequest) {
    return this.itemService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.itemService.delete(request);
  }
}
