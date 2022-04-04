import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTransferTable1649079598217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'source_warehouse_id',
            type: 'int',
          },
          {
            name: 'destination_warehouse_id',
            type: 'int',
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transfers',
      new TableForeignKey({
        columnNames: ['source_warehouse_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'warehouses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transfers',
      new TableForeignKey({
        columnNames: ['destination_warehouse_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'warehouses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transfers');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('source_warehouse_id') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('destination_warehouse_id') !== -1,
    );

    await queryRunner.dropForeignKey('transfers', foreignKey1);
    await queryRunner.dropForeignKey('transfers', foreignKey2);
    await queryRunner.dropTable('transfers');
  }
}
