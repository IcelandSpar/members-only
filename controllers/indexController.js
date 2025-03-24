const {  } = require('../db/queries');

const indexController = async (req, res) => {
    res.render('index', {
        title: 'Home'
    });
}

const postIndexController = (req, res) => {
    console.log(req.body);
    res.redirect('/');
}

const protectedRouteControllerTest = (req, res) => {
    if(req.isAuthenticated()) {
        console.log('hello worldy world!')
        res.send('<h1>hello worldy world!</h1>\
            <a href="/log-out">Log Out</a>\
            ')
    } else {
        res.send('thou shall not pass!!!')
    }
}

const getLogOutController = (req, res) => {
    req.logout((err) => {
        if(err) { return next(err)}
    });
    res.redirect('/');
}

module.exports = {
    indexController,
    postIndexController,
    protectedRouteControllerTest,
    getLogOutController,
}