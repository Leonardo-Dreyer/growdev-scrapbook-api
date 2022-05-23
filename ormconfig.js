const env = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

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
    migrations: [`${env}/database/migrations/**/*`],
    entities: [`${env}/database/entities/**/*`],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
};
