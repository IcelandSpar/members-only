require('dotenv').config();

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

}

module.exports = {
    getSignUpFormController,
    postSignUpFormController,
    getLogInFormController,
    postLogInController,
    getMemberSignUpForm,
    postMemberSignUpForm,
}