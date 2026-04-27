"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BskyAppView = void 0;
const node_util_1 = require("node:util");
const lex_1 = require("@atproto/lex");
class BskyAppView {
    constructor(options) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cdnUrlPattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.did = options.did;
        this.url = options.url;
        this.client = new lex_1.Client({ service: options.url }, {
            strictResponseProcessing: false,
            validateResponse: options.validateResponse ?? false,
        });
        this.cdnUrlPattern = options.cdnUrlPattern;
    }
    getImageUrl(pattern, did, cid) {
        if (this.cdnUrlPattern)
            return (0, node_util_1.format)(this.cdnUrlPattern, pattern, did, cid);
    }
}
exports.BskyAppView = BskyAppView;
//# sourceMappingURL=bsky-app-view.js.map