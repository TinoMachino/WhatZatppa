"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefMatchNamespace = exports.PreferenceReader = void 0;
const index_js_1 = require("../../lexicons/index.js");
const util_1 = require("./util");
class PreferenceReader {
    constructor(db) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
    }
    async getPreferences(namespace, opts) {
        const prefsRes = await this.db.db
            .selectFrom('account_pref')
            .orderBy('id')
            .selectAll()
            .execute();
        const prefs = prefsRes
            .filter((pref) => !namespace || (0, exports.prefMatchNamespace)(namespace, pref.name))
            .map((pref) => JSON.parse(pref.valueJson));
        const personalDetailsPref = prefs.find(index_js_1.app.bsky.actor.defs.personalDetailsPref.$isTypeOf);
        if (personalDetailsPref?.birthDate) {
            const age = (0, util_1.getAgeFromDatestring)(personalDetailsPref.birthDate);
            prefs.push(index_js_1.app.bsky.actor.defs.declaredAgePref.$build({
                isOverAge13: age >= 13,
                isOverAge16: age >= 16,
                isOverAge18: age >= 18,
            }));
        }
        return prefs.filter((pref) => (0, util_1.prefAllowed)(pref.$type, opts));
    }
}
exports.PreferenceReader = PreferenceReader;
const prefMatchNamespace = (namespace, fullname) => {
    return fullname === namespace || fullname.startsWith(`${namespace}.`);
};
exports.prefMatchNamespace = prefMatchNamespace;
//# sourceMappingURL=reader.js.map