/*globals module, require, console, Exception */
/*eslint-disable no-shadow */

const
    fs = require('fs'),
    path = require('path'),
    extname = path.extname;

function stat(file) {
    return function (done) {
        fs.stat(file, done);
    };
}

function storeCtrl(config) {
    'use strict';

    function *serve() {
        const
            path = '/srv/segmentation/files/' + this.params.segmentId,
            fstat = yield stat(path);

        if (fstat.isFile()) {
            this.type = extname(path);
            this.body = fs.createReadStream(path);
        }
    }

    return {
        serve: serve
    };
}

module.exports = storeCtrl;