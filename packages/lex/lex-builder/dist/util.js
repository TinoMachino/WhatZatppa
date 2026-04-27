"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = memoize;
exports.startsWithLower = startsWithLower;
exports.ucFirst = ucFirst;
exports.lcFirst = lcFirst;
exports.toPascalCase = toPascalCase;
exports.toCamelCase = toCamelCase;
exports.toConstantCase = toConstantCase;
exports.toLowerCase = toLowerCase;
exports.toUpperCase = toUpperCase;
exports.asRelativePath = asRelativePath;
exports.startsWithDigit = startsWithDigit;
const node_path_1 = require("node:path");
function memoize(fn) {
    const cache = new Map();
    return ((arg) => {
        const cached = cache.get(arg);
        if (cached !== undefined)
            return cached;
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    });
}
function startsWithLower(str) {
    const code = str.charCodeAt(0);
    return code >= 97 && code <= 122; // 'a' to 'z'
}
function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function toPascalCase(str) {
    return extractWords(str).map(toLowerCase).map(ucFirst).join('');
}
function toCamelCase(str) {
    return lcFirst(toPascalCase(str));
}
function toConstantCase(str) {
    return extractWords(str).map(toUpperCase).join('_');
}
function toLowerCase(str) {
    return str.toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function extractWords(str) {
    const processedStr = str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // split ALLCAPSWords
        .replace(/([0-9])([A-Za-z])/g, '$1 $2') // split number followed by letter
        .replace(/[^a-zA-Z0-9]+/g, ' ') // replace non-alphanumeric with space
        .trim(); // trim leading/trailing spaces
    return processedStr
        ? processedStr.split(/\s+/) // split by spaces
        : []; // Avoid returning [''] for empty strings
}
function asRelativePath(from, to) {
    const relPath = (0, node_path_1.relative)(from, to);
    return relPath.startsWith('./') || relPath.startsWith('../')
        ? relPath
        : `./${relPath}`;
}
function startsWithDigit(str) {
    const code = str.charCodeAt(0);
    return code >= 48 && code <= 57; // '0' to '9'
}
//# sourceMappingURL=util.js.map