import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'common/dto/pagination.dto';
import { PrismaService } from 'nestjs-prisma';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customer, items } = createOrderDto;

    const itemsWithPrice = await Promise.all(
      items.map((item) => this.createOrderItemWithPrice(item)),
    );

    return this.prisma.order.create({
      data: {
        customer: { connect: customer },
        items: { createMany: { data: itemsWithPrice } },
      },
    });
  }

  findAll(paginationDto: PaginationDto) {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
        payment: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
        payment: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }

  private async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { id } = orderItemDto.product;

    const { price } = await this.prisma.product.findUniqueOrThrow({
      where: { id },
    });

    const orderItem: Prisma.OrderItemCreateManyOrderInput = {
      ...orderItemDto,
      productId: id,
      price,
    };
    return orderItem;
  }
}
