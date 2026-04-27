"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUriToThreadgateUri = postUriToThreadgateUri;
exports.postUriToPostgateUri = postUriToPostgateUri;
exports.uriToDid = uriToDid;
exports.safePinnedPost = safePinnedPost;
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../lexicons/index.js");
const types_js_1 = require("../views/types.js");
/**
 * Convert a post URI to a threadgate URI. If the URI is not a valid
 * post URI, return URI unchanged. Threadgate lookups will then fail.
 */
function postUriToThreadgateUri(postUri) {
    const urip = new syntax_1.AtUri(postUri);
    if (urip.collection === index_js_1.app.bsky.feed.post.$type) {
        urip.collection = index_js_1.app.bsky.feed.threadgate.$type;
    }
    return urip.toString();
}
/**
 * Convert a post URI to a postgate URI. If the URI is not a valid
 * post URI, return URI unchanged. Postgate lookups will then fail.
 */
function postUriToPostgateUri(postUri) {
    const urip = new syntax_1.AtUri(postUri);
    if (urip.collection === index_js_1.app.bsky.feed.post.$type) {
        urip.collection = index_js_1.app.bsky.feed.postgate.$type;
    }
    return urip.toString();
}
function uriToDid(uri) {
    // @NOTE URIs returned from the dataplane are always in DID form.
    return new syntax_1.AtUri(uri).hostname;
}
// @TODO temp fix for proliferation of invalid pinned post values
function safePinnedPost(value) {
    const validated = (0, types_js_1.validateStrongRef)(value);
    return validated.success ? validated.value : undefined;
}
//# sourceMappingURL=uris.js.map