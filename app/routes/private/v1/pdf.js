const
    fs = require('fs'),
    path = require('path'),
    htmlToPdf = require('html-pdf'),
    formidable = require("formidable"),
    appDir = require('path').dirname(require.main.filename),
    extname = path.extname;

function pdfCtrl(config) {
    'use strict';

    function getPdfList(req, res) {

        let fileNames = [];

        if (req.params.pdfId) {
            console.log(this.params);
        }
        let resultDir = function (callback) {
            fs.readdir(appDir + "/html", callback)
        };

        if (0 < resultDir.length) {
            res.send(resultDir);
            res.status(200);
        }
        else {
            res.status(203);
        }

    }

    function generateNewPdf(req, res) {
        let template,
            templateHtml;

        if (req.body.name === undefined) {
            res.status(403).send('missing pdf name');
        }

        if (-1 !== req.body.name.indexOf('test.html')) {
            template = path.join(appDir + "/html/contractTest1/", req.body.name);
        }
        else if (-1 !== req.body.name.indexOf('webikeo.html')) {
            template = path.join(appDir + "/html/webikeo/", req.body.name);
        }

        fs.readFile(template, 'utf8', createPdf.bind(undefined, req, res));
    }

    function generateNewPdfFromString(req, res) {
        let templateHtml,
            form = new formidable.IncomingForm();

        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.type = "multipart";
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            let arrFiles = Object.keys(files).map(function (key) {
                return files[key]
            });

            fs.readFile(arrFiles[0].path, 'utf8', createPdf.bind(undefined, req, res));

        });
    };
    function createPdf(req, res, err, templateHtml) {
        let options = {
            "footer": {
                "height": "28mm",
                "contents": '<span style="color: darkred;">{{page}}</span>/<span>{{pages}}</span>'
            },
            border: "0",
            format: "A4"
        };
        htmlToPdf
            .create(templateHtml, options)
            .toStream(function (err, stream) {
                let pdfName = "generated Pdf";

                if (err) {
                    res.send(err);
                }
                pdfName = encodeURIComponent(pdfName);
                res.set('Content-disposition', 'inline; filename="' + pdfName + '"');
                res.set('Content-type', 'application/pdf');
                stream.pipe(res);
            });
    }

    return {
        get: getPdfList,
        newPdf: generateNewPdf,
        newPdfFromString: generateNewPdfFromString
    };
}

module.exports = pdfCtrl;