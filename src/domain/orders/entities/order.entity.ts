import { RegistryDates } from '#/common/embedded/registry-dates.embedded.js';
import { OrderStatus } from '#d/orders/util/order-status.constants.js';
import { Payment } from '#d/payments/entities/payment.entity.js';
import { User } from '#d/users/entities/user.entity.js';
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { OrderItem } from './order-item.entity.js';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: 'AWAITING_PAYMENT' })
  status: OrderStatus;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToOne(() => User, (customer) => customer.orders, { nullable: false })
  customer: Relation<User>;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Relation<Payment>;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: Relation<OrderItem>[];

  @Expose()
  get total() {
    return this.items?.reduce((sum, item) => sum + item.subTotal, 0);
  }
}
