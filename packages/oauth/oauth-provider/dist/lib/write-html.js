"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeHtml = writeHtml;
const node_crypto_1 = require("node:crypto");
const index_js_1 = require("./csp/index.js");
const index_js_2 = require("./html/index.js");
const response_js_1 = require("./http/response.js");
const security_headers_js_1 = require("./http/security-headers.js");
function writeHtml(res, options) {
    // @NOTE the csp string might be quite long. In that case it might be tempting
    // to set it through the http-equiv <meta> in the HTML. However, some
    // directives cannot be enforced by browsers when set through the meta tag
    // (e.g. 'frame-ancestors'). Therefore, it's better to set the CSP through the
    // HTTP header.
    const csp = (0, index_js_1.mergeCsp)({
        // Keep "upgrade-insecure-requests" in sync with HSTS setting. HSTS is
        // typically set to false for localhost endpoints. Chrome and FF will
        // ignore "upgrade-insecure-requests" from localhost, but Safari will
        // enforce it, requiring to be explicitly disable it for localhost.
        'upgrade-insecure-requests': options.hsts !== false,
        'default-src': ["'none'"],
        'base-uri': options.base?.origin,
        'script-src': options.scripts?.map(assetToCsp).filter((v) => v != null),
        'style-src': options.styles?.map(assetToCsp).filter((v) => v != null),
    }, options.csp);
    const html = (0, index_js_2.buildDocument)(options).toString();
    // HTML pages should always be served with safety protection headers
    (0, security_headers_js_1.setSecurityHeaders)(res, { ...options, csp });
    (0, response_js_1.writeBuffer)(res, html, {
        ...options,
        contentType: options?.contentType ?? 'text/html; charset=utf-8',
    });
}
function assetToCsp(asset) {
    if (asset == null)
        return undefined;
    if (asset instanceof index_js_2.Html) {
        // Inline assets are "allowed" by their hash
        const hash = (0, node_crypto_1.createHash)('sha256');
        for (const fragment of asset)
            hash.update(fragment);
        return `'sha256-${hash.digest('base64')}'`;
    }
    else {
        // External assets are referenced by their origin
        if (asset.url.startsWith('https:') || asset.url.startsWith('http:')) {
            return new URL(asset.url).origin;
        }
        // Internal assets are served from the same origin
        return `'self'`;
    }
}
//# sourceMappingURL=write-html.js.map