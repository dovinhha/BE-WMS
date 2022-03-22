import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '@repositories/category.repository';
import { CreateCategoryRequest } from './dto/request/create-category.request';
import { ResponseBuilder } from '@utils/response-builder';
import { ResponseCodeEnum } from '@enums/response-code.enum';
import { GetCategoriesQuery } from './dto/query/get-categories.query';
import { plainToClass } from 'class-transformer';
import { GetCategoriesResponse } from './dto/response/get-categories.response';
import { GetCategoryQuery } from './dto/query/get-category.query';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { UpdateCategoryRequest } from './dto/request/update-category.request';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createCategory(request: CreateCategoryRequest): Promise<any> {
    const categoryEntity = this.categoryRepository.createEntity(request);
    const category = await this.categoryRepository.save(categoryEntity);
    return new ResponseBuilder(category)
      .withCode(ResponseCodeEnum.CREATED)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async getCategories(request: GetCategoriesQuery): Promise<any> {
    const [data, count] = await this.categoryRepository.getCategories(request);

    const dataReturn = plainToClass(GetCategoriesResponse, data, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withPage({ page: request.page, total: count })
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async getCategory(request: GetCategoryQuery): Promise<any> {
    const category = await this.categoryRepository.findOne({ id: request.id });

    if (!category) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    const dataReturn = plainToClass(GetCategoriesResponse, category, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async deleteCategory(request: GetCategoryQuery): Promise<any> {
    const category = await this.categoryRepository.findOne({ id: request.id });

    if (!category) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    await this.categoryRepository.remove(category);
    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }

  async updateCategory(request: UpdateCategoryRequest): Promise<any> {
    const category = await this.categoryRepository.findOne({ id: request.id });

    if (!category) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .withMessage(ResponseMessageEnum.NOT_FOUND)
        .build();
    }

    category.name = request.name;
    if (request.description) category.description = request.description;
    if (request.cartegories_id)
      category.cartegories_id = request.cartegories_id;

    await this.categoryRepository.save(category);
    return new ResponseBuilder(category)
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .build();
  }
}
