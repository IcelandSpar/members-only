const db = require('../db/queries');
const { intlFormatDistance } = require('date-fns');

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

const postIndexController = (req, res) => {
    console.log(req.user);
    const timePosted = new Date();
    db.postNewMessage(req.user.id, req.body.title, timePosted, req.body.message);
    res.redirect('/');
}

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


module.exports = {
    indexController,
    postIndexController,
    protectedRouteControllerTest,
    getLogOutController,
}