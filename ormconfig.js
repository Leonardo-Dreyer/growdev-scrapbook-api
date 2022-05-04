const { join } = require('path');

require('dotenv').config();

module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [join(__dirname, '**', '*.migrations.{ts,js}')],
    entities: [join(__dirname, '**', '*.entities.{ts,js}')],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
};
