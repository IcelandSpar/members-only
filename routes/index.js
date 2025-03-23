const { Router } = require('express');
const indexRouter = Router();
const { indexController, postIndexController } = require('../controllers/indexController');

indexRouter.get('/', indexController);
indexRouter.post('/form-test', postIndexController)

module.exports = indexRouter;