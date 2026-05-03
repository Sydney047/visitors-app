const pool = require( './pool' );

async function getAllVisitors() {
    try {
        console.log( 'Seeding....')
        const { rows } = await pool.query( "SELECT * FROM visitors;" );
        return rows;
    } catch (error) {
        console.log( error.message );
    } finally{ console.log( "Done" ) }
}
async function addVisitor( firstName, lastName, email, age, bio ) {
    await pool.query( `INSERT INTO visitors 
                            ( firstName, lastName, email, age, bio ) VALUES ($1, $2, $3, $4, $5); `, 
                            [ firstName, lastName, email, age, bio ] );
}
async function updateVisitorInfo( id, firstName, lastName, email, age ) {
    await pool.query( `UPDATE visitors 
                            SET firstName = ($2), lastName = ($3), age = ($5) WHERE id = ($1) AND email = ($4);`,
                            [ id, firstName, lastName, email, age ] );
}
async function deleteVisitor( id, email ) {
    await pool.query( 'DELETE FROM visitors WHERE id = ($1) AND email IN ($2);', [ id, email ] );
}
async function findVisitor( input ) {
    const search = `%${input}%`;
    const { rows } = await pool.query( `SELECT * FROM visitors WHERE 
                                                email LIKE ($1) OR firstName LIKE ($1) OR lastName LIKE ($1);` , [ search ] )
    return rows;
}

module.exports = { getAllVisitors, addVisitor, updateVisitorInfo, deleteVisitor, findVisitor };