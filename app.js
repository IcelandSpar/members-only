require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('node:path');
const PORT = process.env.PORT;
const indexRouter = require('./routes/index');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./db/pool');
const formRouter = require('./routes/formRoutes');
const passport = require('passport');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({extended: true}));

app.use(session({
    store: new pgSession({
        pool: pgPool,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:  60 * 1000 } // 60 seconds test
}));
app.use(passport.authenticate('session'));

require('./config/passport');

app.use('/', indexRouter);
app.use('/form', formRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})