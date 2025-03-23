const {  } = require('../db/queries');

const indexController = async (req, res) => {

    res.render('index', {
        title: 'Home'
    });
}

const postIndexController = (req, res) => {
    console.log(req.body.test)
    res.redirect('/')
}

module.exports = {
    indexController,
    postIndexController,
}