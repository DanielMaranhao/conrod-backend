import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class RegistryDates {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
