require('dotenv').config();

const { genPassword } = require('../lib/passwordUtils');
const db = require('../db/queries');
const { body, validationResult } = require("express-validator");



const validateUser = [
  body('username').trim()
    .isAlphanumeric().withMessage('Username must be an alphanumeric value.')
    .isLength({min: 1, max: 25}).withMessage('Username must be between 1-25 characters.'),
  body('password').trim()
    .exists({checkFalsy: true}).withMessage('You must type a passwrd.'),
  body('confirmPassword').trim()
    .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
    .custom((value, {req}) => value === req.body.password).withMessage('The Passwords do not match.'),
  body('firstName').trim()
    .exists({checkFalsy: true}).withMessage('You must complete the first name field.')
    .isAlpha().withMessage('First Name must only contain letters.'),
  body('lastName').trim()
    .exists({checkFalsy: true}).withMessage('You must complete the last name field.')
    .isAlpha().withMessage('Last Name must only contain letters.')
];









const getSignUpFormController = (req, res) => {
    res.render('sign-up-form', {isLoggedIn: req.isAuthenticated()});
}

const postSignUpFormController = [
    validateUser,
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render('sign-up-form', {
            errors: errors.array(),
            isLoggedIn: req.isAuthenticated(),
        });
    }


    const hashAndSalt = await genPassword(req.body.password);
    await db.postUserInfo(req.body.username, hashAndSalt.hash, hashAndSalt.salt, req.body.firstName, req.body.lastName);
    res.redirect('/form/sign-up');
}];

const getLogInFormController = (req, res) => {
    res.render('log-in-form', {title: 'Log In'});
}

const postLogInController = (req, res) => {
    res.redirect('/form/log-in');
}

const getMemberSignUpForm = (req, res) => {
    res.render('member-sign-up');
}

const postMemberSignUpForm = async (req, res) => {

    if(req.body.password == process.env.BECOME_MEMBER_PASS) {

        await db.changeToAdmin(req.user.id);
        res.redirect('/');
        
    } else {
        res.redirect('/form/member-sign-up');
    }

};

module.exports = {
    getSignUpFormController,
    postSignUpFormController,
    getLogInFormController,
    postLogInController,
    getMemberSignUpForm,
    postMemberSignUpForm,
}