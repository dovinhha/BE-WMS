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
import { JwtAuthGuard } from '@components/auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryRequest } from './dto/request/create-category.request';
import { GetCategoriesQuery } from './dto/query/get-categories.query';
import { GetCategoryQuery } from './dto/query/get-category.query';
import { UpdateCategoryRequest } from './dto/request/update-category.request';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() request: CreateCategoryRequest) {
    return this.categoryService.createCategory(request);
  }

  @Get()
  getCategories(@Query() request: GetCategoriesQuery) {
    return this.categoryService.getCategories(request);
  }

  @Get(':id')
  getCategory(@Param() request: GetCategoryQuery) {
    return this.categoryService.getCategory(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateCategory(
    @Body() request: UpdateCategoryRequest,
    @Param() param: GetCategoryQuery,
  ) {
    return this.categoryService.updateCategory({ ...request, ...param });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCategory(@Param() request: GetCategoryQuery) {
    return this.categoryService.deleteCategory(request);
  }
}
