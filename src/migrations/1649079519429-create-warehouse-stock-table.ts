import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createWarehouseStockTable1649079519429
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'warehouse_stocks',
        columns: [
          {
            name: 'item_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'warehouse_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'quantity',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'warehouse_stocks',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'warehouse_stocks',
      new TableForeignKey({
        columnNames: ['warehouse_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'warehouses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('warehouse_stocks');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('item_id') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('warehouse_id') !== -1,
    );

    await queryRunner.dropForeignKey('warehouse_stocks', foreignKey1);
    await queryRunner.dropForeignKey('warehouse_stocks', foreignKey2);
    await queryRunner.dropTable('warehouse_stocks');
  }
}
