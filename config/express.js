const hbs = require('express-handlebars');
const express = require('express');
const coockieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');
const storageMiddleware = require('../middlewares/storage');

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(coockieParser());
    app.use(authMiddleware());
    app.use(storageMiddleware());

    //TO DO add storage and auth middlewares
}