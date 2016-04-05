/*globals module, require, console */

function debugTool(config) {
    return function * (next) {
        'use strict';

        const noop = require('node-noop').noop,
            fs = require('fs');

        function logMethod(bool, marker, label, kapsule) {
            if (bool) {
                let kapsuleTmp = kapsule;

                if ('object' === typeof kapsule) {
                    kapsuleTmp = JSON.stringify(kapsule);
                }
                console.log(marker + ': ' + label + ' | ' + kapsuleTmp);
                fs.appendFile('/var/log/node/error.segment.log', marker + ': ' + label + ' | ' + kapsuleTmp + '\n');
            }
        }

        function log(label, kapsule) {
            logMethod(config.activeDebug, 'LOG', label, kapsule);
        }

        function logSQL(label, kapsule) {
            logMethod(config.activeDebugSql, 'QUERY', label, kapsule);
        }

        this.info = noop;
        this.log = log;
        this.logSQL = logSQL;

        yield next;
    };
}

module.exports = debugTool;