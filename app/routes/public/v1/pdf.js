const
    fs = require( 'fs' ),
    path = require( 'path' ),
    htmlToPdf = require( 'html-pdf' ),
    appDir = require( 'path' ).dirname( require.main.filename ),
    extname = path.extname;

function pdfCtrl ( config ) {
    'use strict';

    function getPdfList ( req, res ) {

        let fileNames = [];

        if ( req.params.pdfId ) {
            console.log( this.params );
        }
        let resultDir = function ( callback ) {
            fs.readdir( appDir + "/html", callback )
        };

        if ( 0 < resultDir.length ) {
            res.send( resultDir );
            res.status( 200 );
        }
        else {
            res.status( 203 );
        }

    }

    function generateNewPdf ( req, res ) {
        if ( req.body.name === undefined ) {
            res.status( 403 ).send( 'missing pdf name' );
        }

        let template = path.join( appDir + "/html/contractTest1/", req.body.name ),
            templateHtml = fs.readFileSync( template, 'utf8' ),
            options = {
                "footer": {
                    "height": "28mm",
                    "contents": '<span style="color: darkred;">{{page}}</span>/<span>{{pages}}</span>'
                },
                "base": "file:///home/ben/Dev/html-to-pdf-server/app/html/contractTest1/",
                "border": "0",
                format:"A4"
            };
        htmlToPdf
            .create( templateHtml, options )
            .toStream( function ( err, stream ) {
                let test = req.params.pdfName;

                if ( err ) {
                    res.send( err );
                }
                test = encodeURIComponent( test );
                res.set( 'Content-disposition', 'inline; filename="' + test + '"' );
                res.set( 'Content-type', 'application/pdf' );
                stream.pipe( res );
            } );
    }

    return {
        get   : getPdfList,
        newPdf: generateNewPdf
    };
}

module.exports = pdfCtrl;