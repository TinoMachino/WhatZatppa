"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const node_stream_1 = require("node:stream");
const protobuf_1 = require("@bufbuild/protobuf");
const connect_1 = require("@connectrpc/connect");
const express_1 = require("express");
const logger_1 = require("../logger");
const bsky_pb_1 = require("../proto/bsky_pb");
const createRouter = (ctx) => {
    const router = (0, express_1.Router)();
    router.get('/external/sitemap/users.xml.gz', userIndexHandler(ctx));
    router.get('/external/sitemap/users/:date/:bucket.xml.gz', userPageHandler(ctx));
    return router;
};
exports.createRouter = createRouter;
const userIndexHandler = (ctx) => async (_req, res) => {
    try {
        const result = await ctx.dataplane.getSitemapIndex({
            type: bsky_pb_1.SitemapPageType.USER,
        });
        res.set('Content-Type', 'application/gzip');
        res.set('Content-Encoding', 'gzip');
        node_stream_1.Readable.from(Buffer.from(result.sitemap)).pipe(res);
    }
    catch (err) {
        logger_1.httpLogger.error({ err }, 'failed to get sitemap index');
        return res.status(500).send('Internal Server Error');
    }
};
const userPageHandler = (ctx) => async (req, res) => {
    const { date, bucket } = req.params;
    // Parse date (YYYY-MM-DD format)
    const dateParts = date.split('-');
    if (dateParts.length !== 3) {
        return res.status(400).send('Invalid date format. Expected YYYY-MM-DD');
    }
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return res.status(400).send('Invalid date format. Expected YYYY-MM-DD');
    }
    // Parse bucket (1-indexed)
    const bucketNum = parseInt(bucket, 10);
    if (isNaN(bucketNum) || bucketNum < 1) {
        return res.status(400).send('Invalid bucket number');
    }
    try {
        const result = await ctx.dataplane.getSitemapPage({
            type: bsky_pb_1.SitemapPageType.USER,
            date: protobuf_1.Timestamp.fromDate(new Date(year, month - 1, day)),
            bucket: bucketNum,
        });
        res.set('Content-Type', 'application/gzip');
        res.set('Content-Encoding', 'gzip');
        node_stream_1.Readable.from(Buffer.from(result.sitemap)).pipe(res);
    }
    catch (err) {
        if (err instanceof connect_1.ConnectError && err.code === connect_1.Code.NotFound) {
            return res.status(404).send('Sitemap page not found');
        }
        logger_1.httpLogger.error({ err }, 'failed to get sitemap page');
        return res.status(500).send('Internal Server Error');
    }
};
//# sourceMappingURL=sitemap.js.map