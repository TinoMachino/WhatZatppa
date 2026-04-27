"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callAsync = callAsync;
exports.invokeOnce = invokeOnce;
exports.includedIn = includedIn;
async function callAsync(fn, ...args) {
    return (await fn?.(...args));
}
function invokeOnce(fn) {
    let fnNullable = fn;
    return function (...args) {
        if (fnNullable) {
            const fn = fnNullable;
            fnNullable = null;
            return fn.call(this, ...args);
        }
        throw new Error('Function called multiple times');
    };
}
function includedIn(value) {
    return this.includes(value);
}
//# sourceMappingURL=function.js.map