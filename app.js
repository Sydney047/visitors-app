require( 'dotenv' ).config();
const { env } = require('node:process');
const express = require('express');
const path = require('path');
const indexRouter = require( './routes/indexRouter')

const app = express();
//ejs settings
app.set( 'views', path.join( __dirname, 'views') );
app.set( 'view engine', 'ejs' );
app.use( express.urlencoded({ extended: true }) );
const staticAssests = path.join( __dirname, 'public' );
app.use( express.static( staticAssests ) );

const PORT = process.env.PORT || 3000;
app.listen( PORT, ( error ) => {
    if ( error ) {
        console.log( error );
        ;
    }
    console.log( `Server listening on port ${ PORT }` );
    
})

app.use( '/', indexRouter );

app.use( ( _req, res ) => {
    res.status( 404 ).render( '404.ejs', { title: '404 Ooooopsss Page Not Found' } );
})