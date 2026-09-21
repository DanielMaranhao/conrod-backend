import { Public } from '#/auth/decorators/public.decorator.js';
import { Roles } from '#/auth/decorators/roles.decorator.js';
import { Role } from '#/auth/roles/enums/role.enum.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { PaginationDto } from '#/querying/dto/pagination.dto.js';
import { ApiPaginatedResponse } from '#/querying/swagger/decorators/api-paginated-response.decorator.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { Category } from './entities/category.entity.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles([Role.MANAGER])
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiPaginatedResponse(Category)
  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.categoriesService.findOne(id);
  }

  @Roles([Role.MANAGER])
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Roles([Role.MANAGER])
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.categoriesService.remove(id);
  }
}
