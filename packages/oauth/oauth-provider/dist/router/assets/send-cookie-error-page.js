"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookieErrorPageFactory = sendCookieErrorPageFactory;
const assets_js_1 = require("./assets.js");
function sendCookieErrorPageFactory(customization, options) {
    const sendApp = (0, assets_js_1.sendWebAppFactory)('cookie-error-page', customization, options);
    return async function sendCookieErrorPage(req, res, data) {
        return sendApp(req, res, {
            status: 400,
            data: { __continueUrl: data.continueUrl.toString() },
        });
    };
}
//# sourceMappingURL=send-cookie-error-page.js.map