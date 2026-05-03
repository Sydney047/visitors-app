require( 'dotenv' ).config();
const { env } = require('node:process');
const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
});