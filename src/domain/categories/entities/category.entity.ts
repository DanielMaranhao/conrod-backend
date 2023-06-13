import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { Product } from 'products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
