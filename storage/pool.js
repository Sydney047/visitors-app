require( 'dotenv' ).config();
const { Pool } = require('pg');
const { env } = require('node:process');

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
});