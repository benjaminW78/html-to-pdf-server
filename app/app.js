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
        apacheLog = require('./utils/apacheLog')(config),
        bodyParser = require('body-parser'),
        koa = require('express'),
        //privateRouterV1 = require('./routes/mainRouter').privateRouterV1(config),
        publicRouterV1 = require('./routes/mainRouter').publicRouterV1(config),
        app = koa();

    //app.use(apacheLog);
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use( bodyParser.urlencoded( {     // to support URL-encoded bodies
        extended: true
    } ) );

    app.use(publicRouterV1);

    app.listen(config.http.port);

    module.exports = app;

    process.on('SIGTERM', function () {
        console.log('Worker exiting');
        process.exit();
    });
}