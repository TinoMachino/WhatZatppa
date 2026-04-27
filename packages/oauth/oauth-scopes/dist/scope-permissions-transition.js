"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopePermissionsTransition = void 0;
const scope_permissions_js_1 = require("./scope-permissions.js");
/**
 * Overrides the default permission set to allow transitional scopes to be used
 * in place of the generic scopes.
 */
class ScopePermissionsTransition extends scope_permissions_js_1.ScopePermissions {
    get hasTransitionGeneric() {
        return this.scopes.has('transition:generic');
    }
    get hasTransitionEmail() {
        return this.scopes.has('transition:email');
    }
    get hasTransitionChatBsky() {
        return this.scopes.has('transition:chat.bsky');
    }
    allowsAccount(options) {
        if (options.attr === 'email' &&
            options.action === 'read' &&
            this.hasTransitionEmail) {
            return true;
        }
        return super.allowsAccount(options);
    }
    allowsBlob(options) {
        if (this.hasTransitionGeneric) {
            return true;
        }
        return super.allowsBlob(options);
    }
    allowsRepo(options) {
        if (this.hasTransitionGeneric) {
            return true;
        }
        return super.allowsRepo(options);
    }
    allowsRpc(options) {
        const { lxm } = options;
        if (this.hasTransitionGeneric && lxm === '*') {
            return true;
        }
        if (this.hasTransitionGeneric && !lxm.startsWith('chat.bsky.')) {
            return true;
        }
        if (this.hasTransitionChatBsky && lxm.startsWith('chat.bsky.')) {
            return true;
        }
        return super.allowsRpc(options);
    }
}
exports.ScopePermissionsTransition = ScopePermissionsTransition;
//# sourceMappingURL=scope-permissions-transition.js.map