import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm';

export class CreateTableMessage1650420369941 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'message',
                columns: [
                    {
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'detail',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'user_uid',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        referencedTableName: 'user',
                        referencedColumnNames: ['uid'],
                        columnNames: ['user_uid']
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message', true, true, true);
    }
}
