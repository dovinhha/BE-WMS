import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetailRepository } from '@repositories/purchase-order-detail.repository';
import { PurchaseOrderRepository } from '@repositories/purchase-order.repository';
import { DetailRequest } from '@utils/detail.request';
import { ResponsePayload } from '@utils/response-payload';
import { Connection } from 'typeorm';
import { ListPurchaseOrderQuery } from './dto/query/list-purchase-order.query';
import { CreatePurchaseOrderRequest } from './dto/request/create-purchase-order.request';
import { UpdatePurchaseOrderRequest } from './dto/request/update-purchase-order.request';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrderRepository)
    private readonly purchaseOrderRepository: PurchaseOrderRepository,

    @InjectRepository(PurchaseOrderDetailRepository)
    private readonly purchaseOrderDetailRepository: PurchaseOrderDetailRepository,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(
    request: CreatePurchaseOrderRequest,
  ): Promise<ResponsePayload<any>> {
    return;
  }

  async update(
    request: UpdatePurchaseOrderRequest & DetailRequest,
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
