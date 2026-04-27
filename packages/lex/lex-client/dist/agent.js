"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAgent = isAgent;
exports.buildAgent = buildAgent;
function isAgent(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'fetchHandler' in value &&
        typeof value.fetchHandler === 'function' &&
        (!('did' in value) ||
            value.did === undefined ||
            typeof value.did === 'string'));
}
function buildAgent(options) {
    const config = typeof options === 'function'
        ? { did: undefined, fetchHandler: options }
        : typeof options === 'string' || options instanceof URL
            ? { did: undefined, service: options }
            : options;
    if (isAgent(config))
        return config;
    const { service, fetch = globalThis.fetch } = config;
    if (typeof fetch !== 'function') {
        throw new TypeError('fetch() is not available in this environment');
    }
    return {
        get did() {
            return config.did;
        },
        async fetchHandler(path, init) {
            const headers = config.headers != null && init.headers != null
                ? mergeHeaders(config.headers, init.headers)
                : config.headers || init.headers;
            return fetch(new URL(path, service), headers !== init.headers ? { ...init, headers } : init);
        },
    };
}
function mergeHeaders(defaultHeaders, requestHeaders) {
    // We don't want to alter the original Headers objects, so we create a new one
    const result = new Headers(defaultHeaders);
    const overrides = requestHeaders instanceof Headers
        ? requestHeaders
        : new Headers(requestHeaders);
    for (const [key, value] of overrides.entries()) {
        result.set(key, value);
    }
    return result;
}
//# sourceMappingURL=agent.js.map