"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1650420228428 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUser1650420228428 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'uid',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user', true, true, true);
    }
}
exports.CreateTableUser1650420228428 = CreateTableUser1650420228428;
