const pg = require('pg-promise')();
require('dotenv').config();

const conn = pg({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

module.exports = conn;