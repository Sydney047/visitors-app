const db = require( '../storage/db' );
const { body, matchedData, validationResult } = require('express-validator');

const isLengthErr= 'must be between 1 and 15 charaters long';
const isAlphaErr = 'must only contain alphabet characters';
const isEmailErr = 'Provide valid email';
const isSearchErr = 'Search field can not be empty';
const validateUser = [
    body( 'firstName' ).trim()
        .isAlpha().withMessage( `First name ${ isAlphaErr }` )
        .isLength( { min: 1, max: 15 } ).withMessage( `First name ${ isLengthErr }` ),
    body( 'lastName' ).trim()
        .isAlpha().withMessage( `Last name ${ isAlphaErr }` )
        .isLength( { min: 1, max: 15 } ).withMessage( `Last name ${ isLengthErr }` ),
    body( 'email' ).trim()
        .isEmail().withMessage( `${ isEmailErr }` )
        .normalizeEmail()
        .escape(),
    body( 'age' ).trim()
        .optional(),
    body( 'bio' ).trim()
        .escape().isLength({ min: 8 }).withMessage( 'Bio can not be left empty')
];
const validateDataUpdate = [
    body( 'firstName' ).trim().optional()
        .isAlpha().withMessage( `First name ${ isAlphaErr }` )
        .isLength( { min: 1, max: 15 } ).withMessage( `First name ${ isLengthErr }` ),
    body( 'lastName' ).trim().optional()
        .isAlpha().withMessage( `Last name ${ isAlphaErr }` )
        .isLength( { min: 1, max: 15 } ).withMessage( `Last name ${ isLengthErr }` ),
    body( 'email' ).trim()
        .isEmail().withMessage( `${ isEmailErr }` )
        .normalizeEmail()
        .escape(),
    body( 'age' ).trim()
        .optional(),
    body( 'bio' ).trim().optional()
        .escape().isLength({ min: 8 }).withMessage( 'Bio can not be left empty')
];
const validateSearch = [
    body( 'search' ).trim().escape()
        .isLength( {min: 1}).withMessage( `${ isSearchErr }` )
]
const validateDeletion = [
    body( 'id' ).trim().isLength( { min: 1} ),
    body( 'email' ).trim().isEmail()
]

exports.indexController = ( req, res ) => {
    res.render( 'index', { title: 'Our Visitors', users: db.getUsers() } );
}
exports.createControllerGet = ( req, res ) => {
    res.render( 'create', { title: 'Add Visitor' } );
}
exports.createControllerPost = [
    validateUser, ( req, res ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 ).render( 'create', { title: 'Add Visitor', errors: errors.array() } );
        }

        const { firstName, lastName, email, age, bio } = matchedData( req );
        db.addUser( firstName, lastName, email, age, bio );
        res.redirect( '/' );
    }
]
exports.updateUserGet = ( req, res ) => {
    const user = req.params.id;
    res.render( 'updateUser', { title: 'Update User Information', user } );
}
exports.updateUserPost = [
    validateDataUpdate, ( req, res ) => {
        const user = req.params.id;
        const errors = validationResult( req );

        if ( !errors.isEmpty() ) {
            return res.render( 'updateUser', { title: 'Update User Information', user, errors: errors.array() } );
        }

        const { firstName, lastName, email, age } = matchedData( req, { includeOptionals: true } );
        db.updateUser( user, firstName, lastName, email, age );
        res.redirect( '/' );
    }
]
exports.deleteUserGet = ( req, res ) => {
    res.render( 'deleteUser', { title: 'Remove Visitor' } );
}
exports.deleteUserPost = [
    validateDeletion, ( req, res ) => {
        const { id, email } = matchedData( req );
        
        console.log(id, email);
        db.deleteUser( id, email )
        res.redirect( '/' );
    }
]
exports.searchControllerPost = [
    validateSearch, ( req, res ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.render( 'searchUser', { title: 'Search Visitor', errors: errors.array() } );
        }

        const search = matchedData( req );
        console.log( search);
        
        res.render( 'index', { search: db.searchUser( search.search ), users: db.getUsers(), title: 'List Of Our Users' } );
    }
]