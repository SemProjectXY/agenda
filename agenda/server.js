const express = require('express');
const session = require('express-session');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');

const routes = require('./routes');
const middlewares = require('./src/middlewares/middlewareGlobal');

const sessionSettings = {
    secret: 'DKL93JKM9F9D',
    store: new MongoStore({ mongoUrl: process.env.CONNECTDB }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: false,
    saveUnitialize: false
}

mongoose.connect(process.env.CONNECTDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Conected');
    app.emit('DBCONNECTED');
});
mongoose.set('useFindAndModify', false);

app.use(flash());

app.use(session(sessionSettings));
app.use(express.urlencoded({ extendeds: true }));

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewares.middlewareGlobal);

app.use(routes);

app.use(middlewares.checkError);

app.on('DBCONNECTED', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    });
});