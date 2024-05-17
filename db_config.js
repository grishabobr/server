const {Client} = require('pg');

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'monitoring',
    password: 'grisha',
    port: 5432
});

db.connect();

module.exports.db = db;