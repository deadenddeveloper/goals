const fs = require('fs')

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: 'sqlite::memory:',
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'postgres',
    },
}
