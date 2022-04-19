import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_details')
export class SaleOrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sale_order_id: number;

  @Column()
  item_id: number;

  @Column()
  warehouse_id: number;

  @Column()
  plan_quantity: number;

  @Column()
  actual_quantity: number;
}
