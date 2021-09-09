const mongoose = require('mongoose');
const config = require('./index');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('connection error:', err);
            reject(err);
        });
        db.once('open', function () {
            console.log('Database ready!');
            resolve();
        });
    });
};