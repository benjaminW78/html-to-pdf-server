const
    fs = require('fs'),
    path = require('path'),
    htmlToPdf = require('html-pdf'),
    appDir = require('path').dirname(require.main.filename),
    extname = path.extname;

function pdfCtrl(config) {
    'use strict';

    function *getPdfList() {

        let fileNames = [],
            that = this;
        if (this.params.pdfId) {
            console.log(this.params);
        }
        let resultDir = yield function (callback) {
            fs.readdir(appDir + "/html", callback)
        };

        if (0 < resultDir.length) {
            this.body = resultDir;
            this.status = 200;
        }
        else {
            this.status = 203;
        }

    }

    function *generateNewPdf() {
        var name = 'test.html';
        var template = path.join(appDir + "/html/contractTest1/", name)
        var templateHtml = fs.readFileSync(template, 'utf8')
        var that = this;
        ///home/ben/Dev/html-to-pdf-server/app/html/contractTest1/FR_NATIO_CB_2016.doc.html

        var options = yield {
            width: '280mm',
            height: '400mm'
        };
        //this.status = 200;
        //console.log(template);
        var Q = require('q');
//header('Content-Disposition: inline; filename=doc01.pdf');

      function *test () {
            var deferred =  Q.defer();
            htmlToPdf
                .create(templateHtml, options, function (err, filename) {
                    'use strict';
                    if (err) {
                        deferred.reject(err);
                    }

                    that.nameFile = filename.filename;

                    deferred.resolve(that.nameFile);
                });

            return yield deferred.promise;
        };
        var toto = test();
        console.log(toto)
        toto.then(function(data){
            console.log(data)
            that.body = fs.createReadStream(data);
        //
        })

        //.toFile(filename, function () {
        //    'use strict';
        //    that.body = fs.createReadStream(filename);
        //});
        //.toStream(function (err, pdf) {
        //    //that.type= 'application/pdf';
        //    //that.set('Content-Disposition', 'attachment; filename='+name)
        //    if(null !== err) {
        //        console.log(err);
        //        return;
        //    }
        //    console.log(pdf);
        //    that.body = pdf;
        //});
        // generate new pdf from handle bar via available list of pfd
    }

    return {
        get: getPdfList,
        newPdf: generateNewPdf
    };
}

module.exports = pdfCtrl;