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
        let template = path.join( appDir + "/html/contractTest1/", name ),
        templateHtml = fs.readFileSync( template, 'utf8' ),

        options = {
            width : '280mm',
            height: '400mm'
        };

        htmlToPdf
            .create( templateHtml, options )
            .toStream( function ( err, stream ) {
                console.log( arguments );
                if ( err ) {
                    res.send( err );
                }
                let test = "WhateverFilenameYouWant.pdf";
                test = encodeURIComponent( test );
                res.set( 'Content-disposition', 'inline; filename="' + test + '"' );
                res.set( 'Content-type', 'application/pdf' );
                data2.pipe( res );
            } );
    }

    return {
        get   : getPdfList,
        newPdf: generateNewPdf
    };
}

module.exports = pdfCtrl;