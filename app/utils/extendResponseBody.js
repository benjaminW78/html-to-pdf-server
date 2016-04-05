/*globals module, require */

function *extendResponseBody(next) {
    const moment = require('moment'),
        result = {
            status: this.status,
            message: '',
            code: this.status,
            moreInfo: '',
            errors: [],
            time: (moment()).toISOString(),
            additional: ''
        };

    function manageCode(status, body, request) {
        if (404 === status) {
            result.message = 'Resource not found';
            result.moreInfo = 'Resource not found';
            body = result;
        }
        if (200 === status) {
            if (true !== body.notExpand) {
                body = Object.assign({}, body, request);
            } else {
                delete body.notExpand;
            }
        }
        return body;
    }

    try {
        yield next;
    } catch (eXception) {
        this.log('eXception', eXception);
    } finally {
        try {
            if (-1 === this.request.url.indexOf('store')) {
                this.body = manageCode(this.status, this.body, this.request.body);
            }
        } catch (eXception) {
            this.body = {
                status: 'error',
                message: 'no request url'
            };
        }
    }
}

module.exports = extendResponseBody;