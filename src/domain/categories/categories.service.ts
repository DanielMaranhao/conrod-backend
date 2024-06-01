import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'common/dto/pagination.dto';
import { PrismaService } from 'nestjs-prisma';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll(paginationDto: PaginationDto) {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUniqueOrThrow({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category.products.length) {
      throw new ConflictException('Category has related products');
    }
    return this.prisma.category.delete({ where: { id } });
  }
}
