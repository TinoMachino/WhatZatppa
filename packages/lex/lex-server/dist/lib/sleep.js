"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortableSleep = abortableSleep;
async function abortableSleep(ms, signal) {
    signal.throwIfAborted();
    return new Promise((resolve, reject) => {
        const cleanup = () => {
            signal.removeEventListener('abort', onAbort);
            clearTimeout(timeoutHandle);
        };
        const timeoutHandle = setTimeout(() => {
            cleanup();
            resolve();
        }, ms);
        const onAbort = () => {
            cleanup();
            reject(signal.reason);
        };
        signal.addEventListener('abort', onAbort);
    });
}
//# sourceMappingURL=sleep.js.map