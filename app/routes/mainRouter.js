/*globals module, require */
'use strict';

const router = require('express');

/**
 * Declare all private roads inside this function
 * @param config file from app.js file
 * @returns {} router object containing every public roads
 */
function privateRouterV1(config) {
    const privRoutesV1 = require('./private/')(config).v1,
        privRouter = router.Router();

    privRouter
        .post('/private/v1/pdf', privRoutesV1.pdf.newPdf)
        .post('/private/v1/stringToPdf', privRoutesV1.pdf.newPdfFromString);
        //.post('/auth', pubRoutesV1.auth.do);

    return privRouter;
}
//
//function privateRouterV1(config) {
//    const privRoutesV1 = require('./private/')(config).v1,
//        privRouter = router();
//
//    privRouter
//        .use(privRoutesV1.verifyAuth.do)
//        .prefix('/private/v1')
//        .post('/segment', privRoutesV1.segment.create)
//        .get('/segments/', privRoutesV1.segment.list)
//        .put('/segment/:segmentId', privRoutesV1.segment.update)
//        .get('/segment/:segmentId', privRoutesV1.segment.get)
//        .get('/segment/:segmentId/count', privRoutesV1.segment.count)
//        .get('/segment/:segmentId/extraction/:email', privRoutesV1.segment.extraction)
//        .delete('/segment/:segmentId', privRoutesV1.segment.remove);
//
//    return privRouter;
//}

//module.exports.publicRouterV1 = publicRouterV1;
module.exports.privateRouterV1 = privateRouterV1;