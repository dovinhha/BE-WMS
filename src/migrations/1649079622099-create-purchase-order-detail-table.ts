import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPurchaseOrderDetailTable1649079622099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchase_order_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'purchase_order_id',
            type: 'int',
          },
          {
            name: 'item_id',
            type: 'int',
          },
          {
            name: 'warehouse_id',
            type: 'int',
          },
          {
            name: 'plan_quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'actual_quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'purchase_order_details',
      new TableForeignKey({
        columnNames: ['purchase_order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'purchase_orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'purchase_order_details',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'purchase_order_details',
      new TableForeignKey({
        columnNames: ['warehouse_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'warehouses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('purchase_order_details');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('purchase_order_id') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('item_id') !== -1,
    );
    const foreignKey3 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('warehouse_id') !== -1,
    );

    await queryRunner.dropForeignKey('purchase_order_details', foreignKey1);
    await queryRunner.dropForeignKey('purchase_order_details', foreignKey2);
    await queryRunner.dropForeignKey('purchase_order_details', foreignKey3);
    await queryRunner.dropTable('purchase_order_details');
  }
}
