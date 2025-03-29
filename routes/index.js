const { Router } = require('express');
const indexRouter = Router();
const { indexController, postIndexController, getLogOutController } = require('../controllers/indexController');

indexRouter.get('/', indexController);

indexRouter.post('/', postIndexController);

indexRouter.post('/form-test', postIndexController);

indexRouter.get('/log-out', getLogOutController);

module.exports = indexRouter;