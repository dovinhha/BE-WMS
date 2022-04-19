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
import { ListPurchaseOrderQuery } from './dto/query/list-purchase-order.query';
import { CreateSaleOrderRequest } from './dto/request/create-sale-order.request';
import { UpdateSaleOrderRequest } from './dto/request/update-sale-order.request';
import { SaleOrderService } from './sale-order.service';

@Controller('sale-order')
export class SaleOrderController {
  constructor(private saleOrderService: SaleOrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateSaleOrderRequest) {
    return this.saleOrderService.create(request);
  }

  @Get()
  list(@Query() request: ListPurchaseOrderQuery) {
    return this.saleOrderService.list(request);
  }

  @Get(':id')
  detail(@Param() request: DetailRequest) {
    return this.saleOrderService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() request: UpdateSaleOrderRequest,
    @Param() param: DetailRequest,
  ) {
    return this.saleOrderService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.saleOrderService.delete(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/confirm')
  confirm(@Param() request: DetailRequest) {
    return this.saleOrderService.confirm(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reject')
  reject(@Param() request: DetailRequest) {
    return this.saleOrderService.reject(request);
  }
}
