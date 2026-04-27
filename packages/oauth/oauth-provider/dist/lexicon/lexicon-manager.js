"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexiconManager = void 0;
exports.nsidToPermissionScopes = nsidToPermissionScopes;
const lex_resolver_1 = require("@atproto/lex-resolver");
const oauth_scopes_1 = require("@atproto/oauth-scopes");
const lexicon_getter_js_1 = require("./lexicon-getter.js");
__exportStar(require("./lexicon-store.js"), exports);
class LexiconManager {
    lexiconGetter;
    constructor(store, lexResolver) {
        this.lexiconGetter = new lexicon_getter_js_1.LexiconGetter(store, lexResolver);
    }
    async getPermissionSetsFromScope(scope) {
        const { includeScopes } = parseScope(scope);
        return this.extractPermissionSets(includeScopes);
    }
    /**
     * Transforms a scope string from an authorization request into a scope
     * composed solely of granular permission scopes, transforming any NSID
     * into its corresponding permission scopes.
     */
    async buildTokenScope(scope) {
        const { includeScopes, otherScopes } = parseScope(scope);
        // If the scope does not contain any "include:<nsid>" scopes, return it as-is.
        if (!includeScopes.length)
            return scope;
        const permissionSets = await this.extractPermissionSets(includeScopes);
        return Array.from(includeScopes)
            .flatMap(nsidToPermissionScopes, permissionSets)
            .concat(otherScopes)
            .join(' ');
    }
    /**
     * Given a list of scope values, extract those that are NSIDs and return their
     * corresponding permission sets.
     */
    async extractPermissionSets(includeScopes) {
        const nsids = extractNsids(includeScopes);
        return this.getPermissionSets(nsids);
    }
    async getPermissionSets(nsids) {
        return new Map(await Promise.all(Array.from(nsids, this.getPermissionSetEntry, this)));
    }
    async getPermissionSetEntry(nsid) {
        const permissionSet = await this.getPermissionSet(nsid);
        return [nsid, permissionSet];
    }
    async getPermissionSet(nsid) {
        const { lexicon } = await this.lexiconGetter.get(nsid);
        if (!lexicon) {
            throw lex_resolver_1.LexResolverError.from(nsid);
        }
        if (lexicon.defs.main?.type !== 'permission-set') {
            const description = 'Lexicon document is not a permission set';
            throw lex_resolver_1.LexResolverError.from(nsid, description);
        }
        return lexicon.defs.main;
    }
}
exports.LexiconManager = LexiconManager;
function parseScope(scope) {
    const includeScopes = [];
    const otherScopes = [];
    if (scope) {
        for (const scopeValue of scope.split(' ')) {
            const parsed = oauth_scopes_1.IncludeScope.fromString(scopeValue);
            if (parsed) {
                includeScopes.push(parsed);
            }
            else {
                otherScopes.push(scopeValue);
            }
        }
    }
    return {
        includeScopes,
        otherScopes,
    };
}
function extractNsids(includeScopes) {
    return new Set(Array.from(includeScopes, extractNsid));
}
function extractNsid(nsidScope) {
    return nsidScope.nsid;
}
function nsidToPermissionScopes(includeScope) {
    const permissionSet = this.get(includeScope.nsid);
    if (permissionSet)
        return includeScope.toScopes(permissionSet);
    // Should never happen (mostly there for type safety & future proofing)
    throw new Error(`Missing permission set for NSID: ${includeScope.nsid}`);
}
//# sourceMappingURL=lexicon-manager.js.map