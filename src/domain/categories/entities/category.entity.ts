import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
