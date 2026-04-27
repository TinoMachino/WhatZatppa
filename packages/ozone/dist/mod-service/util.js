"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFromDbDatetime = exports.dateFromDatetime = exports.getPdsAgentForRepo = exports.isSafeUrl = exports.signLabel = exports.formatLabelRow = exports.formatLabel = void 0;
const node_net_1 = __importDefault(require("node:net"));
const kysely_1 = require("kysely");
const api_1 = __importDefault(require("@atproto/api"));
const common_1 = require("@atproto/common");
const formatLabel = (row) => {
    return (0, common_1.noUndefinedVals)({
        ver: 1,
        src: row.src,
        uri: row.uri,
        cid: row.cid === '' ? undefined : row.cid,
        val: row.val,
        neg: row.neg === true ? true : undefined,
        cts: row.cts,
        exp: row.exp ?? undefined,
        sig: row.sig ? new Uint8Array(row.sig) : undefined,
    });
};
exports.formatLabel = formatLabel;
const formatLabelRow = (label, signingKeyId) => {
    return {
        src: label.src,
        uri: label.uri,
        cid: label.cid ?? '',
        val: label.val,
        neg: !!label.neg,
        cts: label.cts,
        exp: label.exp ?? null,
        sig: label.sig ? Buffer.from(label.sig) : null,
        signingKeyId: signingKeyId ?? null,
    };
};
exports.formatLabelRow = formatLabelRow;
const signLabel = async (label, signingKey) => {
    const { ver, src, uri, cid, val, neg, cts, exp } = label;
    // @TODO cborEncode now ignores undefined properties, so we might not need to
    // reformat the label here. We might want to consider this if we ever re-visit
    // the logic below:
    const reformatted = (0, common_1.noUndefinedVals)({
        ver: ver ?? 1,
        src,
        uri,
        cid,
        val,
        neg: neg === true ? true : undefined,
        cts,
        exp,
    });
    const bytes = (0, common_1.cborEncode)(reformatted);
    const sig = await signingKey.sign(bytes);
    return {
        ...reformatted,
        sig,
    };
};
exports.signLabel = signLabel;
const isSafeUrl = (url) => {
    if (url.protocol !== 'https:')
        return false;
    if (!url.hostname || url.hostname === 'localhost')
        return false;
    if (node_net_1.default.isIP(url.hostname) !== 0)
        return false;
    return true;
};
exports.isSafeUrl = isSafeUrl;
const getPdsAgentForRepo = async (idResolver, did, devMode) => {
    const { pds } = await idResolver.did.resolveAtprotoData(did);
    const url = new URL(pds);
    if (!devMode && !(0, exports.isSafeUrl)(url)) {
        return { url, agent: null };
    }
    return { url, agent: new api_1.default({ service: url }) };
};
exports.getPdsAgentForRepo = getPdsAgentForRepo;
const dateFromDatetime = (datetime) => {
    const [date] = datetime.toISOString().split('T');
    return date;
};
exports.dateFromDatetime = dateFromDatetime;
const dateFromDbDatetime = (dateRef) => {
    return (0, kysely_1.sql) `SPLIT_PART(${dateRef}, 'T', 1)`;
};
exports.dateFromDbDatetime = dateFromDbDatetime;
//# sourceMappingURL=util.js.map