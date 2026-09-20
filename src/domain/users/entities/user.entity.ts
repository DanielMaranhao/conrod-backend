import { Role } from '#/auth/roles/enums/role.enum.js';
import { RegistryDates } from '#/common/embedded/registry-dates.embedded.js';
import { Order } from '#d/orders/entities/order.entity.js';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'role_enum',
    default: Role.USER,
  })
  role: Role;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }

  @OneToMany(() => Order, (order) => order.customer, {
    cascade: ['soft-remove', 'recover'],
  })
  orders: Relation<Order>[];
}
