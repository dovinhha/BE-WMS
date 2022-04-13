import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseStockEntity } from './warehouse-stock.entity';

@Entity('warehouses')
export class WarehouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @OneToMany(() => WarehouseStockEntity, (ws) => ws.warehouse, {
    cascade: ['insert'],
  })
  warehouseStocks: WarehouseStockEntity[];
}
