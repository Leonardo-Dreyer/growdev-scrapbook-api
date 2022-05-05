const path = require('path');

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
    migrations: [path.join(__dirname, '**', 'database/migrations/**/*')],
    entities: [path.join(__dirname, '**', 'database/entities/**/*')],
    //migrations: ['src/database/migrations/**/*'],
    //entities: ['src/database/entities/**/*'],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
};
