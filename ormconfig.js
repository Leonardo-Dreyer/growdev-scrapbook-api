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
    entities: [path.join(__dirname, '..', 'entities', '**', '*')],
    migrations: [path.join(__dirname, 'migrations', '**', '*')],
    cli: {
        entitiesDir: 'src/core/data/database/entities',
        migrationsDir: 'src/core/data/database/migrations'
    }
};
