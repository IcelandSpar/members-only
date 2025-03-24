
const getSignUpFormController = (req, res) => {
    res.render('sign-up-form');
}

const postSignUpFormController = (req, res) => {
    console.log(req.body);
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