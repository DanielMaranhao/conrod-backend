import { ConflictException, Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async payOrder(id: number) {
    const { payment } = await this.prisma.order.findUniqueOrThrow({
      where: { id },
      include: { payment: true },
    });
    if (payment) {
      throw new ConflictException('Order already paid');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.AWAITING_SHIPMENT,
        payment: { create: {} },
      },
    });
  }
}
