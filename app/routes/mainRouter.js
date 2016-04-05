/*globals module, require */
'use strict';

const router = require('koa-joi-router');

/**
 * Declare all public roads inside this function
 * @param config file from app.js file
 * @returns {} router object containing every public roads
 */
function publicRouterV1(config) {
    const pubRoutesV1 = require('./public/')(config).v1,
        pubRouter = router();

    pubRouter
        .prefix('/public/v1')
        .get('/pdf/:pdfId', pubRoutesV1.pdf.get)
        .get('/pdf', pubRoutesV1.pdf.get);
        //.post('/auth', pubRoutesV1.auth.do);

    return pubRouter;
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

module.exports.publicRouterV1 = publicRouterV1;
//module.exports.privateRouterV1 = privateRouterV1;