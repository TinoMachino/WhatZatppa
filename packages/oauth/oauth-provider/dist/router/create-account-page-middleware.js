"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountPageMiddleware = createAccountPageMiddleware;
const index_js_1 = require("../lib/http/index.js");
const send_account_page_js_1 = require("./assets/send-account-page.js");
const send_error_page_js_1 = require("./assets/send-error-page.js");
function createAccountPageMiddleware(server, { onError }) {
    const issuerUrl = new URL(server.issuer);
    const issuerOrigin = issuerUrl.origin;
    const securityOptions = {
        hsts: issuerUrl.protocol === 'http:' ? false : undefined,
    };
    const sendAccountPage = (0, send_account_page_js_1.sendAccountPageFactory)(server.customization, securityOptions);
    const sendErrorPage = (0, send_error_page_js_1.sendErrorPageFactory)(server.customization, securityOptions);
    const router = new index_js_1.Router(issuerUrl);
    // Create password reset discovery endpoint
    // https://www.w3.org/TR/change-password-url/
    router.get('/.well-known/change-password', (_req, res) => {
        (0, index_js_1.writeRedirect)(res, new URL('/account/reset-password', issuerUrl).toString());
    });
    // Create frontend account pages
    router.get(/^\/account(?:\/.*)?$/, async function (req, res) {
        try {
            res.setHeader('Referrer-Policy', 'same-origin');
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');
            (0, index_js_1.validateFetchMode)(req, ['navigate']);
            (0, index_js_1.validateFetchDest)(req, ['document']);
            (0, index_js_1.validateOrigin)(req, issuerOrigin);
            const { deviceId } = await server.deviceManager.load(req, res);
            const deviceAccounts = await server.accountManager.listDeviceAccounts(deviceId);
            sendAccountPage(req, res, {
                deviceSessions: deviceAccounts.map((deviceAccount) => ({
                    account: deviceAccount.account,
                    loginRequired: server.checkLoginRequired(deviceAccount),
                })),
            });
        }
        catch (err) {
            onError?.(req, res, err, `Failed to handle navigation request to "${req.url}"`);
            if (!res.headersSent) {
                return sendErrorPage(req, res, err);
            }
        }
    });
    return router.buildMiddleware();
}
//# sourceMappingURL=create-account-page-middleware.js.map