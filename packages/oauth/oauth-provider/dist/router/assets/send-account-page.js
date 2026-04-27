"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAccountPageFactory = sendAccountPageFactory;
const assets_js_1 = require("./assets.js");
function sendAccountPageFactory(customization, options) {
    const sendApp = (0, assets_js_1.sendWebAppFactory)('account-page', customization, options);
    return async function sendAccountPage(req, res, data) {
        return sendApp(req, res, {
            data: { __deviceSessions: data.deviceSessions },
        });
    };
}
//# sourceMappingURL=send-account-page.js.map