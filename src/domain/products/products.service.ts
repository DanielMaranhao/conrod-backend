import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'common/dto/pagination.dto';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    const { categories } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        categories: { connect: categories },
      },
    });
  }

  findAll(paginationDto: PaginationDto) {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        categories: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { categories } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        categories: { set: categories },
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
