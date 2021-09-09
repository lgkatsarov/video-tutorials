const express = require('express');
const config = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

const userService = require('./services/user');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(config.PORT, () => console.log(`Application started at http://localhost:${config.PORT}`));
}
