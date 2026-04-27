"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KWS_V2_COUNTRIES = exports.KWS_SUPPORTED_LANGUAGES = void 0;
/**
 * Supported languages for KWS Adult Verification. This list comes from KWS's
 * Age Verification Developer Guide PDF doc.
 */
exports.KWS_SUPPORTED_LANGUAGES = new Set([
    'en',
    'ar',
    'zh-Hans',
    'nl',
    'tl',
    'fr',
    'de',
    'id',
    'it',
    'ja',
    'ko',
    'pl',
    'pt-BR',
    'pt',
    'ru',
    'es',
    'th',
    'tr',
    'vi',
]);
/**
 * Regions where our "version 2" using the `age-verified` KWS flow is
 * available. In these regions, we'll use a different KWS flow from the
 * existing `adult-verified` flow, pass along a different external payload, and
 * handle webhooks/redirects differently in the appview.
 */
exports.KWS_V2_COUNTRIES = new Set(['AU']);
//# sourceMappingURL=const.js.map