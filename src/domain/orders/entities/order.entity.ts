import { Expose } from 'class-transformer';
import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { OrderStatus } from 'orders/util/order-status.constants';
import { Payment } from 'payments/entities/payment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: 'AWAITING_PAYMENT',
  })
  status: OrderStatus;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToOne(() => User, (customer) => customer.orders, { nullable: false })
  customer: User;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Payment;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Expose()
  get total() {
    return this.items?.reduce((total, item) => total + item.subTotal, 0);
  }
}
