"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const api_1 = require("./api");
const webhook_1 = require("./webhook");
const createRouter = (ctx) => {
    assertAppContextWithAgeAssuranceClient(ctx);
    const router = (0, express_1.Router)();
    router.use((0, express_1.raw)({ type: 'application/json' }));
    router.post('/age-assurance-webhook', (0, webhook_1.webhookAuth)({
        secret: ctx.cfg.kws.webhookSecret,
    }), (0, webhook_1.webhookHandler)(ctx));
    router.get('/age-assurance-verification', (0, api_1.verificationHandler)(ctx));
    return router;
};
exports.createRouter = createRouter;
const assertAppContextWithAgeAssuranceClient = (ctx) => {
    if (!ctx.kwsClient) {
        throw new Error('Tried to set up KWS router without kwsClient configured.');
    }
};
//# sourceMappingURL=index.js.map