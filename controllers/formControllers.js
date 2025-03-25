const { genPassword } = require('../lib/passwordUtils');
const db = require('../db/queries');

const getSignUpFormController = (req, res) => {
    res.render('sign-up-form');
}

const postSignUpFormController = async (req, res) => {
    const hashAndSalt = await genPassword(req.body.password);
    await db.postUserInfo(req.body.username, hashAndSalt.hash, hashAndSalt.salt, req.body.firstName, req.body.lastName);
    res.redirect('/form/sign-up');
}

const getLogInFormController = (req, res) => {
    res.render('log-in-form', {title: 'Log In'});
}

const postLogInController = (req, res) => {
    console.log(req.body);
    res.redirect('/form/log-in');
}

module.exports = {
    getSignUpFormController,
    postSignUpFormController,
    getLogInFormController,
    postLogInController,
}