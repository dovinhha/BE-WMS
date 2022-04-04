import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createHistoryDetailTable1649079638039
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'history_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'history_id',
            type: 'int',
          },
          {
            name: 'source_sloc_code',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'source_sloc_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'destination_sloc_code',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'destination_sloc_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'import_quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'export_quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'plan_quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'actual_quantity',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'history_details',
      new TableForeignKey({
        columnNames: ['history_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'histories',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('history_details');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('history_id') !== -1,
    );

    await queryRunner.dropForeignKey('history_details', foreignKey1);
    await queryRunner.dropTable('history_details');
  }
}
