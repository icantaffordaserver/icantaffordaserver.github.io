const dotenv = require('dotenv');

// Require this here for the case that we just run the migration scripts
dotenv.config();

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        directory: __dirname + '/server/data/migrations'
    },
    seeds: {
        directory: __dirname + '/server/data/seeds'
    }
};
