/*globals module, require, process */

const fs = require('fs');

function constructDbUrl(dbConf) {
    if (dbConf) {
        if (undefined === dbConf.databaseUrl) {
            if (dbConf.db_superuser && dbConf.db_superpassword && dbConf.db_host && dbConf.db_name) {
                dbConf.databaseUrl = 'postgres://' + dbConf.db_superuser;
                if (dbConf.db_superpassword) {
                    dbConf.databaseUrl += ':' + dbConf.db_superpassword;
                }
                dbConf.databaseUrl += '@' + dbConf.db_host;
                if (dbConf.db_port) {
                    dbConf.databaseUrl += ':' + dbConf.db_port;
                }
                dbConf.databaseUrl += '/' + dbConf.db_name;
            } else {
                fs.appendFile('/var/log/node/error.log', 'missing param inside package.json env db ' + JSON.stringify(dbConf) + '\n');
            }
        }
    } else {
        fs.appendFile('/var/log/node/error.log', 'Arg dbConf undefined inside constructDbUrl function ' + JSON.stringify(dbConf) + '\n');
    }
    return dbConf;
}

function doConfig() {
    'use strict';

    const nconf = require('nconf');
    let config;

    nconf
        .file({
            file: './package.json'
        });
    if (undefined !== process.env.NODE_ENV) {
        config = nconf.get('config:' + process.env.NODE_ENV);
        config.http.port = process.env.PORT || config.http.port;
        config.activeDebug = true;
        config.activeDebugSql = true;
    } else {
        process.env.NODE_ENV = 'development';
        config = nconf.get('config:development');
        config.activeDebug = true;
        config.activeDebugSql = true;
    }
    config.dbData = constructDbUrl(config.dbData);
    config.dbAuth = constructDbUrl(config.dbAuth);
    config.appVersion = nconf.get('version');

    return config;
}

module.exports.current = doConfig();
module.exports.constructDbUrl = constructDbUrl;
