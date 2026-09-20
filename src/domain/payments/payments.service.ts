import { AuthUser } from '#/auth/interfaces/auth-user.interface.js';
import { Role } from '#/auth/roles/enums/role.enum.js';
import { compareUserId } from '#/auth/util/authorization.util.js';
import { Order } from '#d/orders/entities/order.entity.js';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async payOrder(id: number, authUser: AuthUser) {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id },
      relations: { payment: true, customer: true },
    });

    if (authUser.role !== Role.ADMIN) {
      compareUserId(authUser.id, order.customer.id);
    }
    if (order.payment) {
      throw new ConflictException('Order already paid');
    }

    const payment = this.paymentsRepository.create();
    order.payment = payment;
    order.status = 'AWAITING_SHIPMENT';
    return this.ordersRepository.save(order);
  }
}
