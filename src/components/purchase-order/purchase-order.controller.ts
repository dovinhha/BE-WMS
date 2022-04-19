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
import { CreatePurchaseOrderRequest } from './dto/request/create-purchase-order.request';
import { UpdatePurchaseOrderRequest } from './dto/request/update-purchase-order.request';
import { PurchaseOrderService } from './purchase-order.service';

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private purchaseOrderService: PurchaseOrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreatePurchaseOrderRequest) {
    return this.purchaseOrderService.create(request);
  }

  @Get()
  list(@Query() request: ListPurchaseOrderQuery) {
    return this.purchaseOrderService.list(request);
  }

  @Get(':id')
  detail(@Param() request: DetailRequest) {
    return this.purchaseOrderService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() request: UpdatePurchaseOrderRequest,
    @Param() param: DetailRequest,
  ) {
    return this.purchaseOrderService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.purchaseOrderService.delete(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/confirm')
  confirm(@Param() request: DetailRequest) {
    return this.purchaseOrderService.confirm(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reject')
  reject(@Param() request: DetailRequest) {
    return this.purchaseOrderService.reject(request);
  }
}
