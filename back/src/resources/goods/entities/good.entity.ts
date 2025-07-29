import { Supplier } from 'src/resources/supplier/entities/supplier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Good {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Supplier, (el) => el.goodsList, {
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinTable()
  supplierList: Supplier[];

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;
}
