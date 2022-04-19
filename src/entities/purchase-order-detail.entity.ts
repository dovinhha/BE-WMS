import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_order_details')
export class PurchaseOrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchase_order_id: number;

  @Column()
  item_id: number;

  @Column()
  warehouse_id: number;

  @Column()
  plan_quantity: number;

  @Column()
  actual_quantity: number;

  @Column()
  price: number;
}
