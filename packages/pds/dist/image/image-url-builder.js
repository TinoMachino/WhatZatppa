"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUrlBuilder = void 0;
const index_js_1 = require("../lexicons/index.js");
class ImageUrlBuilder {
    constructor(pdsHostname, bskyAppView) {
        Object.defineProperty(this, "pdsHostname", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pdsHostname
        });
        Object.defineProperty(this, "bskyAppView", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bskyAppView
        });
    }
    build(pattern, did, cid) {
        return (this.bskyAppView?.getImageUrl(pattern, did, cid) ??
            `https://${this.pdsHostname}/xrpc/${index_js_1.com.atproto.sync.getBlob.$lxm}?did=${did}&cid=${cid}`);
    }
}
exports.ImageUrlBuilder = ImageUrlBuilder;
//# sourceMappingURL=image-url-builder.js.map