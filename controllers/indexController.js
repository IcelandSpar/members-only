const db = require('../db/queries');
const { intlFormatDistance } = require('date-fns');
const { body,  validationResult } = require('express-validator');

const validateDeleteBtn = [
    body('id').trim()
    .isNumeric()
]

const validateMessageForm = [
    body('title').trim()
    .matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('Title must consist of letters, numbers or some special charcters.')
    .isLength({min: 1, max: 25}).withMessage('Title must be between 1-25 characters'),
    body('message').trim()
    .isLength({min: 1, max: 500}).withMessage('Message must be between 1-500 characters.')
    .matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('Message must consist of letters, numbers or some special charcters.'),
]


const indexController = async (req, res) => {
    const msgData = await db.getIndexMessages();
    
        let isUserMember = false;
        if(req.isAuthenticated()) {
            
            
            isUserMember = await db.checkIfMember(req.user.id);
            
        }
    
    let formattedData = [];
    msgData.forEach((item, index) => {
        let newItem = item;
        newItem.time_posted = intlFormatDistance(newItem.time_posted, new Date());
        formattedData.push(newItem);
    });

    res.render('index', {
        title: 'Home',
        msgData: formattedData,
        isLoggedIn: req.isAuthenticated(),
        user: req.user,
        isMember: isUserMember.is_member,
    });
}

const postIndexController = [
    validateMessageForm,
    

async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {


        const msgData = await db.getIndexMessages();
    
        let isUserMember = false;
        if(req.isAuthenticated()) {
            
            
            isUserMember = await db.checkIfMember(req.user.id);
            
        }

        let formattedData = [];
        msgData.forEach((item, index) => {
            let newItem = item;
            newItem.time_posted = intlFormatDistance(newItem.time_posted, new Date());
            formattedData.push(newItem);
        });

        return res.status(400).render('index', {
            title: 'Home',
            msgData: formattedData,
            isLoggedIn: req.isAuthenticated(),
            user: req.user,
            isMember: isUserMember.is_member,
            errors: errors.array(),
        })
    }

    const timePosted = new Date();
    db.postNewMessage(req.user.id, req.body.title, timePosted, req.body.message);
    res.redirect('/');
}];

const protectedRouteControllerTest = (req, res) => {
    if(req.isAuthenticated()) {
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

const postDeleteController = [
    validateDeleteBtn,
async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).redirect('/');
    }
    
    await db.deleteMsg(req.body.id);
    

    res.redirect('/');
}]


module.exports = {
    indexController,
    postIndexController,
    protectedRouteControllerTest,
    getLogOutController,
    postDeleteController,
}