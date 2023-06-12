import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { OrderStatus } from 'orders/enums/order-status.enum';
import { Payment } from 'payments/entities/payment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToOne(() => User, (customer) => customer.orders, { nullable: false })
  customer: User;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Payment;
}
