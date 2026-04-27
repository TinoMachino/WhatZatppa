/**
 * Supported languages for KWS Adult Verification. This list comes from KWS's
 * Age Verification Developer Guide PDF doc.
 */
export declare const KWS_SUPPORTED_LANGUAGES: Set<string>;
/**
 * Regions where our "version 2" using the `age-verified` KWS flow is
 * available. In these regions, we'll use a different KWS flow from the
 * existing `adult-verified` flow, pass along a different external payload, and
 * handle webhooks/redirects differently in the appview.
 */
export declare const KWS_V2_COUNTRIES: Set<string>;
//# sourceMappingURL=const.d.ts.map