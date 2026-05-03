const { Client } = require('pg');
require( 'dotenv' ).config();

async function createDatabaseTable() {
    const client = new Client({ 
        connectionString: process.env.DATABASE_URL
    });

    const Query = `
    CREATE TABLE IF NOT EXISTS visitors ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstName TEXT, lastname TEXT, 
        email VARCHAR( 255 ), age INTEGER, bio TEXT 
    );
    `;

    try {
        console.log( 'Seeding....' );
        await client.connect();
        await client.query( Query );
        console.log( 'Quer above' );
        
    } catch (error) {
        console.log( error.message );
    } finally {
        await client.end();
        console.log( "Done");
    }
    
}
createDatabaseTable();