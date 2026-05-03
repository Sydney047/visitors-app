require( 'dotenv' ).config();
const { Pool } = require('pg');
const { process } = require('node:process');

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
});