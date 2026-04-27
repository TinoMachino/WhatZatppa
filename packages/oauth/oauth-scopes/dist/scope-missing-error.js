"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeMissingError = void 0;
class ScopeMissingError extends Error {
    get statusCode() {
        return this.status;
    }
    constructor(scope) {
        super(`Missing required scope "${scope}"`);
        Object.defineProperty(this, "scope", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: scope
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ScopeMissingError'
        });
        // compatibility layer with http-errors package. The goal if to make
        // isHttpError(new ScopeMissingError) return true.
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 403
        });
        Object.defineProperty(this, "expose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
}
exports.ScopeMissingError = ScopeMissingError;
//# sourceMappingURL=scope-missing-error.js.map