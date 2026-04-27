"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorPageFactory = sendErrorPageFactory;
const error_parser_js_1 = require("../../errors/error-parser.js");
const assets_js_1 = require("./assets.js");
function sendErrorPageFactory(customization, options) {
    const sendApp = (0, assets_js_1.sendWebAppFactory)('error-page', customization, options);
    return async function sendErrorPage(req, res, err) {
        return sendApp(req, res, {
            status: (0, error_parser_js_1.buildErrorStatus)(err),
            data: { __errorData: (0, error_parser_js_1.buildErrorPayload)(err) },
        });
    };
}
//# sourceMappingURL=send-error-page.js.map