"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didAndSeqForEvt = void 0;
const index_js_1 = require("./lexicons/index.js");
const didAndSeqForEvt = (evt) => {
    if (index_js_1.com.atproto.sync.subscribeRepos.commit.$isTypeOf(evt)) {
        return { seq: evt.seq, did: evt.repo };
    }
    else if (index_js_1.com.atproto.sync.subscribeRepos.account.$isTypeOf(evt) ||
        index_js_1.com.atproto.sync.subscribeRepos.identity.$isTypeOf(evt) ||
        index_js_1.com.atproto.sync.subscribeRepos.sync.$isTypeOf(evt)) {
        return { seq: evt.seq, did: evt.did };
    }
    return undefined;
};
exports.didAndSeqForEvt = didAndSeqForEvt;
//# sourceMappingURL=util.js.map