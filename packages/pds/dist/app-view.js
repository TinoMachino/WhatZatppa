"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
const node_util_1 = require("node:util");
const lex_1 = require("@atproto/lex");
class AppView {
    constructor(options) {
        Object.defineProperty(this, "did", {
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
        this.client = new lex_1.Client({ service: options.url });
        this.cdnUrlPattern = options.cdnUrlPattern;
    }
    getImageUrl(pattern, did, cid) {
        if (this.cdnUrlPattern)
            return (0, node_util_1.format)(this.cdnUrlPattern, pattern, did, cid);
    }
}
exports.AppView = AppView;
//# sourceMappingURL=app-view.js.map