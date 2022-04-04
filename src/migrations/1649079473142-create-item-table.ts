import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createItemTable1649079473142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'item_unit_id',
            type: 'int',
          },
          {
            name: 'item_type_id',
            type: 'int',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '45',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: true,
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
      'items',
      new TableForeignKey({
        columnNames: ['item_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'item_units',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        columnNames: ['item_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'item_types',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('items');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('item_unit_id') !== -1,
    );
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('item_type_id') !== -1,
    );

    await queryRunner.dropForeignKey('items', foreignKey1);
    await queryRunner.dropForeignKey('items', foreignKey2);
    await queryRunner.dropTable('items');
  }
}
