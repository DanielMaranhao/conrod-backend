import { PaginationDto } from '#/querying/dto/pagination.dto.js';
import { PaginationService } from '#/querying/pagination.service.js';
import { DefaultPageSize } from '#/querying/util/querying.constants.js';
import { Product } from '#d/products/entities/product.entity.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderItemDto } from './dto/order-item.dto.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Order } from './entities/order.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    const itemsWithPrice = await this.createOrderItemsWithPrice(items);

    const order = this.ordersRepository.create({
      ...createOrderDto,
      items: itemsWithPrice,
    });
    return this.ordersRepository.save(order);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.ORDERS;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.ordersRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);

    return { data, meta };
  }

  findOne(id: number) {
    return this.ordersRepository.findOneOrFail({
      where: { id },
      relations: { items: { product: true }, customer: true, payment: true },
    });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }

  private async createOrderItemsWithPrice(items: OrderItemDto[]) {
    const prodIds = items.map((item) => item.product.id);
    const products = await this.productsRepository.findBy({ id: In(prodIds) });
    const productsMap = new Map(products.map((prod) => [prod.id, prod]));

    const missingIds = prodIds.filter((id) => !productsMap.has(id));
    if (missingIds.length) {
      throw new NotFoundException(`Products #${missingIds.join()} not found`);
    }

    const itemsWithPrice = items.map((item) => {
      const { price } = productsMap.get(item.product.id)!;
      return this.orderItemsRepository.create({ ...item, price });
    });
    return itemsWithPrice;
  }
}
