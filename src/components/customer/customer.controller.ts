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
import { ListcustomerQuery } from './dto/query/list-customer.query';
import { CreateCustomerRequest } from './dto/request/create-customer.request';
import { UpdateCustomerRequest } from './dto/request/update-customer.request';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() request: CreateCustomerRequest) {
    return this.customerService.create(request);
  }

  @Get()
  list(@Query() request: ListcustomerQuery) {
    return this.customerService.list(request);
  }

  @Get(':id')
  detail(@Param() request: DetailRequest) {
    return this.customerService.detail(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() request: UpdateCustomerRequest,
    @Param() param: DetailRequest,
  ) {
    return this.customerService.update({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() request: DetailRequest) {
    return this.customerService.delete(request);
  }
}
