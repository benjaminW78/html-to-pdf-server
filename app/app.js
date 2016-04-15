/*globals require, module, console, process */

'use strict';

const throng = require('throng');

throng(start, {
    workers: 3,
    lifetime: Infinity,
    grace: 4000
});

function start() {
    const config = require('./config').current,
        debug = require('./utils/debug')(config),
        cors = require('koa-cors'),
        //extendResponseBody = require('./utils/extendResponseBody'),
        apacheLog = require('./utils/apacheLog')(config),
        bodyParser = require('koa-bodyparser'),
        koa = require('koa'),
        //privateRouterV1 = require('./routes/mainRouter').privateRouterV1(config),
        publicRouterV1 = require('./routes/mainRouter').publicRouterV1(config),
        app = koa();

    //app.use(apacheLog);
    app.use(bodyParser());
    //app.use(debug);

    app.use(cors({
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE'
    }));




    app.use(publicRouterV1.middleware());
    //app.use(privateRouterV1.middleware());

    app.listen(config.http.port);

    module.exports = app;

    process.on('SIGTERM', function () {
        console.log('Worker exiting');
        process.exit();
    });
}