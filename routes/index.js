const { Router } = require('express');
const indexRouter = Router();
const { indexController, postIndexController, getLogOutController, postDeleteController } = require('../controllers/indexController');

indexRouter.get('/', indexController);

indexRouter.post('/', postIndexController);

indexRouter.post('/form-test', postIndexController);

indexRouter.get('/log-out', getLogOutController);

indexRouter.post('/delete', postDeleteController);

module.exports = indexRouter;