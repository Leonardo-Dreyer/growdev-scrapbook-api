"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableMessage1650420369941 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableMessage1650420369941 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: 'detailing',
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
                new typeorm_1.TableForeignKey({
                    referencedTableName: 'user',
                    referencedColumnNames: ['uid'],
                    columnNames: ['user_uid']
                })
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('message', true, true, true);
    }
}
exports.CreateTableMessage1650420369941 = CreateTableMessage1650420369941;
