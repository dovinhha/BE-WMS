import { CategoryEntity } from '@entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryRequest } from '@components/category/dto/request/create-category.request';
import { GetCategoriesQuery } from '@components/category/dto/query/get-categories.query';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  public createEntity(request: CreateCategoryRequest): CategoryEntity {
    const newCategoryEntity = new CategoryEntity();
    newCategoryEntity.name = request.name;
    newCategoryEntity.description = request.description;
    newCategoryEntity.cartegories_id = request.cartegories_id;
    return newCategoryEntity;
  }

  public async getCategories(
    request: GetCategoriesQuery,
  ): Promise<[any[], number]> {
    const query = this.createQueryBuilder('c').select([
      'c.name AS name',
      'c.slug AS slug',
    ]);

    const data = await query
      .orderBy('c.created_at', 'DESC')
      .skip(request.take)
      .offset(request.skip)
      .getRawMany();
    const count = await query.getCount();
    return [data, count];
  }
}
