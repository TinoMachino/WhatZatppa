"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const did_1 = require("@atproto/did");
const createRouter = (ctx) => {
    const router = (0, express_1.Router)();
    const did = ctx.cfg.serverDid;
    if ((0, did_1.isDidWeb)(did)) {
        const serviceEndpoint = (0, did_1.didWebToUrl)(did).origin;
        router.get('/.well-known/did.json', (_req, res) => {
            res.json({
                '@context': [
                    'https://www.w3.org/ns/did/v1',
                    'https://w3id.org/security/multikey/v1',
                ],
                id: did,
                verificationMethod: [
                    {
                        id: `${did}#atproto`,
                        type: 'Multikey',
                        controller: did,
                        publicKeyMultibase: ctx.signingKey.did().replace('did:key:', ''),
                    },
                ],
                service: [
                    {
                        id: '#bsky_notif',
                        type: 'BskyNotificationService',
                        serviceEndpoint,
                    },
                    {
                        id: '#bsky_appview',
                        type: 'BskyAppView',
                        serviceEndpoint,
                    },
                ],
            });
        });
    }
    return router;
};
exports.createRouter = createRouter;
//# sourceMappingURL=well-known.js.map