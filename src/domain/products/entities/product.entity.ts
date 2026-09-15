import { RegistryDates } from '#/common/embedded/registry-dates.embedded.js';
import { Category } from '#d/categories/entities/category.entity.js';
import { OrderItem } from '#d/orders/entities/order-item.entity.js';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ name: 'product_to_category' })
  categories: Relation<Category>[];

  @OneToMany(() => OrderItem, (item) => item.product)
  items: Relation<OrderItem>[];

  get orders() {
    return this.items.map((item) => item.order);
  }
}
