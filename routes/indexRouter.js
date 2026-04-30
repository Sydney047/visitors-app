const { Router } = require('express');
const userController = require( '../controllers/userController' );

const indexRouter = Router();

indexRouter.get( '/', userController.indexController );
indexRouter.get( '/create', userController.createControllerGet );
indexRouter.post( '/create', userController.createControllerPost );
indexRouter.get( '/:id/update', userController.updateUserGet );
indexRouter.post( '/:id/update', userController.updateUserPost );
indexRouter.get( '/delete', userController.deleteUserGet );
indexRouter.post( '/delete', userController.deleteUserPost );
indexRouter.post( '/search', userController.searchControllerPost );

module.exports = indexRouter;