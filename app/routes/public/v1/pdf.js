const
    fs = require('fs'),
    path = require('path'),
    extname = path.extname;

function pdfCtrl(config) {
    'use strict';

    function *getPdfList() {
        console.log('totottoto');
        let fileNames = [];
        if (this.params.pdfId) {
            console.log(this.params);
        }
        const appDir = require('path').dirname(require.main.filename);
        console.log(appDir);
        fs.readdir(appDir+"/html", function (err, files) {
            if (err) {
                console.log('GROSS GROSS ERROR');
            }
            console.log(files);
        });
    }

    function *generateNewPdf() {
        // generate new pdf from handle bar via available list of pfd
    }

    return {
        get: getPdfList,
        newPdf: generateNewPdf
    };
}

module.exports = pdfCtrl;