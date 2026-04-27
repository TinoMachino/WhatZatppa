"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLexiconStore = void 0;
exports.ifLexiconStore = ifLexiconStore;
exports.asLexiconStore = asLexiconStore;
const type_js_1 = require("../lib/util/type.js");
exports.isLexiconStore = (0, type_js_1.buildInterfaceChecker)([
    'findLexicon',
    'storeLexicon',
    'deleteLexicon',
]);
function ifLexiconStore(implementation) {
    if (implementation && (0, exports.isLexiconStore)(implementation)) {
        return implementation;
    }
    return undefined;
}
function asLexiconStore(implementation) {
    const store = ifLexiconStore(implementation);
    if (store)
        return store;
    throw new Error('Invalid LexiconStore implementation');
}
//# sourceMappingURL=lexicon-store.js.map