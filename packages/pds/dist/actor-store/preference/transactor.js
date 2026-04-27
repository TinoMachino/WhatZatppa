"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceTransactor = void 0;
const xrpc_server_1 = require("@atproto/xrpc-server");
const reader_1 = require("./reader");
const util_1 = require("./util");
class PreferenceTransactor extends reader_1.PreferenceReader {
    async putPreferences(values, namespace, opts) {
        this.db.assertTransaction();
        if (!values.every((value) => (0, reader_1.prefMatchNamespace)(namespace, value.$type))) {
            throw new xrpc_server_1.InvalidRequestError(`Some preferences are not in the ${namespace} namespace`);
        }
        const forbiddenPrefs = values.filter((val) => !(0, util_1.prefAllowed)(val.$type, opts));
        if (forbiddenPrefs.length > 0) {
            throw new xrpc_server_1.InvalidRequestError(`Do not have authorization to set preferences: ${forbiddenPrefs.map((p) => p.$type).join(', ')}`);
        }
        // get all current prefs for user and prep new pref rows
        const allPrefs = await this.db.db
            .selectFrom('account_pref')
            .select(['id', 'name'])
            .execute();
        const putPrefs = values
            .filter((value) => !(0, util_1.isReadOnlyPref)(value.$type))
            .map((value) => {
            return {
                name: value.$type,
                valueJson: JSON.stringify(value),
            };
        });
        const allPrefIdsInNamespace = allPrefs
            .filter((pref) => (0, reader_1.prefMatchNamespace)(namespace, pref.name))
            .filter((pref) => (0, util_1.prefAllowed)(pref.name, opts))
            .map((pref) => pref.id);
        // replace all prefs in given namespace
        if (allPrefIdsInNamespace.length) {
            await this.db.db
                .deleteFrom('account_pref')
                .where('id', 'in', allPrefIdsInNamespace)
                .execute();
        }
        if (putPrefs.length) {
            await this.db.db.insertInto('account_pref').values(putPrefs).execute();
        }
    }
}
exports.PreferenceTransactor = PreferenceTransactor;
//# sourceMappingURL=transactor.js.map