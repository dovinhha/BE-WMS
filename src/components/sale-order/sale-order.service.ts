import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetailRepository } from '@repositories/purchase-order-detail.repository';
import { PurchaseOrderRepository } from '@repositories/purchase-order.repository';
import { SaleOrderDetailRepository } from '@repositories/sale-order-detail.repository';
import { SaleOrderRepository } from '@repositories/sale-order.repository';
import { DetailRequest } from '@utils/detail.request';
import { ResponsePayload } from '@utils/response-payload';
import { Connection } from 'typeorm';
import { ListPurchaseOrderQuery } from './dto/query/list-purchase-order.query';
import { CreateSaleOrderRequest } from './dto/request/create-sale-order.request';
import { UpdateSaleOrderRequest } from './dto/request/update-sale-order.request';

@Injectable()
export class SaleOrderService {
  constructor(
    @InjectRepository(SaleOrderRepository)
    private readonly saleOrderRepository: SaleOrderRepository,

    @InjectRepository(SaleOrderDetailRepository)
    private readonly saleOrderDetailRepository: SaleOrderDetailRepository,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(request: CreateSaleOrderRequest): Promise<ResponsePayload<any>> {
    return;
  }

  async update(
    request: UpdateSaleOrderRequest & DetailRequest,
  ): Promise<ResponsePayload<any>> {
    return;
  }

  async detail(request: DetailRequest): Promise<ResponsePayload<any>> {
    return;
  }

  async delete(request: DetailRequest): Promise<ResponsePayload<any>> {
    return;
  }

  async confirm(request: DetailRequest): Promise<ResponsePayload<any>> {
    return;
  }

  async reject(request: DetailRequest): Promise<ResponsePayload<any>> {
    return;
  }

  async list(request: ListPurchaseOrderQuery): Promise<ResponsePayload<any>> {
    return;
  }
}
