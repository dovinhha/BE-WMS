import { EntityRepository, Repository } from 'typeorm';
import { ListItemUnitQuery } from '@components/item-unit/dto/query/list-item-unit.query';
import { CustomerEntity } from '@entities/customer.entity';
import { CreateCustomerRequest } from '@components/customer/dto/request/create-customer.request';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
  createEntity(request: CreateCustomerRequest): CustomerEntity {
    const entity = new CustomerEntity();
    entity.phone = request.phone;
    entity.address = request.adddress;
    entity.description = request.description;
    return entity;
  }

  async list(request: ListItemUnitQuery): Promise<[CustomerEntity[], number]> {
    const query = this.createQueryBuilder().where('deleted_at IS NULL');
    const data = await query.offset(request.skip).limit(request.take).getMany();
    const count = await query.getCount();

    return [data, count];
  }
}
