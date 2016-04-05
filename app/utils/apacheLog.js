/*globals require, module, Buffer */

const fs = require('fs'),
    moment = require('moment');

function apacheLog(config) {
    'use strict';

    return function *(next) {
        const ip = (this.request.ip.split(':')).pop(),
            datetime = (moment()).format('DD/MMM/YYYY:HH:mm:ss ZZ'),
            useragent = this.req.headers['user-agent'] || '',
            startTime = moment(),
            server = config.http.domain + ':' + config.http.port,
            referer = this.req.headers['referer'] || '-';

        let line,
            weight,
            endTime;

        yield next;

        endTime = (moment()).diff(startTime, 'millisecond') + '000';

        weight = Buffer.byteLength(this.res);
        line = ip + ' - - [' + datetime + '] "' + this.method + ' ' + this.originalUrl + ' HTTP/' + this.req.httpVersion + '" ' + this.status + ' ' + weight + ' "' + referer + '" "' + useragent + '" ' + endTime + ' ' + server;

        fs.appendFile('/var/log/node/access.segment.log', line + '\n');
    };
}

module.exports = apacheLog;