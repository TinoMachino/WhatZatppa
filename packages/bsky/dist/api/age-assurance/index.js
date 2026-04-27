"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const webhook_1 = require("../kws/webhook");
const kws_age_verified_1 = require("./redirects/kws-age-verified");
const kws_age_verified_2 = require("./webhooks/kws-age-verified");
const createRouter = (ctx) => {
    assertAppContextWithAgeAssuranceClient(ctx);
    const router = (0, express_1.Router)();
    router.use((0, express_1.raw)({ type: 'application/json' }));
    router.post('/age-assurance/webhooks/kws-age-verified', (0, webhook_1.webhookAuth)({
        secret: ctx.cfg.kws.ageVerifiedWebhookSecret,
    }), (0, kws_age_verified_2.handler)(ctx));
    router.get('/age-assurance/redirects/kws-age-verified', (0, kws_age_verified_1.handler)(ctx));
    return router;
};
exports.createRouter = createRouter;
const assertAppContextWithAgeAssuranceClient = (ctx) => {
    if (!ctx.kwsClient) {
        throw new Error('Tried to set up KWS router without kwsClient configured.');
    }
};
//# sourceMappingURL=index.js.map