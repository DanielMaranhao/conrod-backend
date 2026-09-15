import { Product } from '#d/products/entities/product.entity.js';
import { Expose } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from 'typeorm';
import { Order } from './order.entity.js';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.items)
  product: Relation<Product>;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @Expose()
  get subTotal() {
    return this.quantity * this.price;
  }
}
