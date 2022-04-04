import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTransferDetailTable1649079605643
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfer_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'transfer_id',
            type: 'int',
          },
          {
            name: 'item_id',
            type: 'int',
          },
          {
            name: 'export_quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'import_quantity',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transfer_details',
      new TableForeignKey({
        columnNames: ['transfer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transfers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transfer_details',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transfer_details');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('transfer_id') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('item_id') !== -1,
    );

    await queryRunner.dropForeignKey('transfer_details', foreignKey1);
    await queryRunner.dropForeignKey('transfer_details', foreignKey2);
    await queryRunner.dropTable('transfer_details');
  }
}
