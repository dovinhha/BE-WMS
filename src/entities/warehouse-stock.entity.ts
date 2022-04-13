import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseEntity } from './warehouse.entity';

@Entity('warehouse_stocks')
export class WarehouseStockEntity {
  @PrimaryColumn()
  itemId: number;

  @Column()
  warehouseId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => WarehouseEntity, (w) => w.warehouseStocks)
  warehouse: WarehouseEntity;
}
