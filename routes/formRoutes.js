const { Router } = require('express');
const { getSignUpFormController, postSignUpFormController, getLogInFormController, postLogInController } = require('../controllers/formControllers');
const { protectedRouteControllerTest } = require('../controllers/indexController');
const passport = require('passport');

const formRouter = Router();

formRouter.get('/sign-up', getSignUpFormController);

formRouter.post('/sign-up', postSignUpFormController);

formRouter.get('/log-in', getLogInFormController);

formRouter.post('/log-in', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/form/log-in'}) , postLogInController);

formRouter.get('/protected-route', protectedRouteControllerTest)



module.exports = formRouter;