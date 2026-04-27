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
__exportStar(require("./atproto-oauth-scope.js"), exports);
__exportStar(require("./scope-missing-error.js"), exports);
__exportStar(require("./scope-permissions-transition.js"), exports);
__exportStar(require("./scope-permissions.js"), exports);
__exportStar(require("./scopes-set.js"), exports);
__exportStar(require("./scopes/account-permission.js"), exports);
__exportStar(require("./scopes/blob-permission.js"), exports);
__exportStar(require("./scopes/identity-permission.js"), exports);
__exportStar(require("./scopes/include-scope.js"), exports);
__exportStar(require("./scopes/repo-permission.js"), exports);
__exportStar(require("./scopes/rpc-permission.js"), exports);
//# sourceMappingURL=index.js.map