require('dotenv').config();

module.exports  = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [
        'src/core/data/database/entities/**/*'
    ],
    migrations: [
        'src/core/data/database/migrations/**/*'
      ],
    cli: {
        entitiesDir: 'src/core/data/database/entities',
        migrationsDir: 'src/core/data/database/migrations'
    }  
}



