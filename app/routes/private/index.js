/*globals require, module */

'use strict';

const fs = require('fs');

function recursiveRequire(path, routes, settings) {
    'use strict';

    fs
        .readdirSync(path)
        .forEach(function (file) {
            let filename = file;

            if (filename.endsWith('.js')) {
                if ('index.js' !== filename) {
                    filename = filename.substring(0, filename.length - 3);
                    routes[filename] = require(path.replace(/\/app\/routes\/private/gi, '') + '/' + filename)(settings);
                }
            } else {
                routes[filename] = {};
                recursiveRequire(path + '/' + filename, routes[filename], settings);
            }
        });
}

function index(config) {
    const routes = {};

    recursiveRequire('./app/routes/private', routes, config);

    return routes;
}

module.exports = index;