"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAuthorizePageFactory = sendAuthorizePageFactory;
const assets_js_1 = require("./assets.js");
function sendAuthorizePageFactory(customization, options) {
    const sendApp = (0, assets_js_1.sendWebAppFactory)('authorization-page', customization, options);
    return async function sendAuthorizePage(req, res, data) {
        return sendApp(req, res, {
            data: {
                __authorizeData: {
                    requestUri: data.requestUri,
                    clientId: data.client.id,
                    clientMetadata: data.client.metadata,
                    clientTrusted: data.client.info.isTrusted,
                    clientFirstParty: data.client.info.isFirstParty,
                    scope: data.parameters.scope,
                    uiLocales: data.parameters.ui_locales,
                    loginHint: data.parameters.login_hint,
                    promptMode: data.parameters.prompt,
                    permissionSets: Object.fromEntries(data.permissionSets),
                    selectedSub: data.selectedSub,
                },
                __sessions: data.sessions,
            },
        });
    };
}
//# sourceMappingURL=send-authorization-page.js.map