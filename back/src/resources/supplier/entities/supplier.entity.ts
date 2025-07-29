import { Good } from 'src/resources/goods/entities/good.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  measure: string;

  @Column({ type: 'timestamp' })
  expireAt: Date;

  @ManyToMany(() => Good, (a) => a.supplierList, { onDelete: 'NO ACTION' })
  goodsList: Good[];

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;
}
