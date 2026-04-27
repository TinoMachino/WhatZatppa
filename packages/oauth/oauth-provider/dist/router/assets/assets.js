"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsMiddleware = void 0;
exports.sendWebAppFactory = sendWebAppFactory;
const build_customization_css_js_1 = require("../../customization/build-customization-css.js");
const build_customization_data_js_1 = require("../../customization/build-customization-data.js");
const index_js_1 = require("../../lib/csp/index.js");
const hydration_data_js_1 = require("../../lib/html/hydration-data.js");
const index_js_2 = require("../../lib/html/index.js");
const security_headers_js_1 = require("../../lib/http/security-headers.js");
const object_js_1 = require("../../lib/util/object.js");
const write_html_js_1 = require("../../lib/write-html.js");
const assets_manifest_js_1 = require("./assets-manifest.js");
const csrf_js_1 = require("./csrf.js");
// If the "ui" and "frontend" packages are ever unified, this can be replaced
// with a single expression:
//
// const { getAssets, assetsMiddleware } = parseAssetsManifest(
//   require.resolve('@atproto/oauth-provider-ui/bundle-manifest.json'),
// )
const ui = (0, assets_manifest_js_1.parseAssetsManifest)(require.resolve('@atproto/oauth-provider-ui/bundle-manifest.json'));
function getAssets(entryName) {
    const assetRef = ui.getAssets(entryName);
    if (assetRef)
        return assetRef;
    // Fool-proof. Should never happen.
    throw new Error(`Entry "${entryName}" not found in assets`);
}
exports.assetsMiddleware = ui.assetsMiddleware;
const SPA_CSP = {
    // API calls are made to the same origin
    'connect-src': ["'self'"],
    // Allow loading of PDS logo & User avatars
    'img-src': ['data:', 'https:'],
    // Prevent embedding in iframes
    'frame-ancestors': ["'none'"],
};
/**
 * @see {@link https://docs.hcaptcha.com/#content-security-policy-settings}
 */
const HCAPTCHA_CSP = {
    'script-src': ['https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'frame-src': ['https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'style-src': ['https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'connect-src': ['https://hcaptcha.com', 'https://*.hcaptcha.com'],
};
function sendWebAppFactory(page, customization, defaults = {}) {
    // Pre-computed options:
    const customizationData = (0, build_customization_data_js_1.buildCustomizationData)(customization);
    const customizationCss = (0, index_js_2.cssCode)((0, build_customization_css_js_1.buildCustomizationCss)(customization));
    const { scripts, styles } = getAssets(page);
    const csp = (0, index_js_1.mergeCsp)(SPA_CSP, customization.hcaptcha ? HCAPTCHA_CSP : undefined);
    const coep = customization.hcaptcha
        ? // hCaptcha's implementation of COEP is currently broken. Let's disable it
            // to avoid breaking the entire page.
            //
            // https://github.com/hCaptcha/react-hcaptcha/issues/259
            // https://github.com/hCaptcha/react-hcaptcha/issues/380
            security_headers_js_1.CrossOriginEmbedderPolicy.unsafeNone
        : // Since we are loading avatars form other origins, which might not have
            // CORP headers, we need to use the "credentialless" value, which allows
            // loading cross-origin resources without credentials (cookies, client
            // certificates, etc.). This is a more secure alternative to
            // "unsafe-none". Ideally, we would want to set COEP to "require-corp" and
            // ensure that all cross-origin resources have the appropriate CORP
            // headers.
            security_headers_js_1.CrossOriginEmbedderPolicy.credentialless;
    return async function sendWebApp(req, res, options) {
        await (0, csrf_js_1.setupCsrfToken)(req, res);
        const script = (0, hydration_data_js_1.declareHydrationData)({
            ...options.data,
            __customizationData: customizationData,
        });
        return (0, write_html_js_1.writeHtml)(res, (0, object_js_1.mergeDefaults)(defaults, options, {
            bodyAttrs: { class: 'text-text-default bg-contrast-0' },
            csp: options?.csp ? (0, index_js_1.mergeCsp)(csp, options.csp) : csp,
            coep: options?.coep ?? coep,
            meta: [{ name: 'robots', content: 'noindex' }],
            body: (0, index_js_2.html) `<div id="root"></div>`,
            scripts: [script, ...scripts],
            styles: [...styles, customizationCss],
        }));
    };
}
//# sourceMappingURL=assets.js.map