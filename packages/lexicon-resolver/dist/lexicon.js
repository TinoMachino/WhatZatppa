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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexiconResolutionError = exports.resolveLexicon = exports.NSID = exports.AtUri = exports.LEXICON_SCHEMA_NSID = void 0;
exports.buildLexiconResolver = buildLexiconResolver;
exports.resolveLexiconDidAuthority = resolveLexiconDidAuthority;
const promises_1 = __importDefault(require("node:dns/promises"));
const lex_1 = require("@atproto/lex");
const lex_document_1 = require("@atproto/lex-document");
const syntax_1 = require("@atproto/syntax");
Object.defineProperty(exports, "AtUri", { enumerable: true, get: function () { return syntax_1.AtUri; } });
Object.defineProperty(exports, "NSID", { enumerable: true, get: function () { return syntax_1.NSID; } });
const lexiconsSchema = __importStar(require("./lexicons/com/atproto/lexicon/schema.js"));
const record_js_1 = require("./record.js");
const DNS_SUBDOMAIN = '_lexicon';
const DNS_PREFIX = 'did=';
exports.LEXICON_SCHEMA_NSID = lexiconsSchema.$nsid;
/**
 * Build a Lexicon resolver function.
 */
function buildLexiconResolver(options = {}) {
    const resolveRecord = (0, record_js_1.buildRecordResolver)(options);
    return async function (input, opts = {}) {
        const nsid = syntax_1.NSID.from(input);
        const didAuthority = await getDidAuthority(nsid, opts);
        const verified = await resolveRecord(syntax_1.AtUri.make(didAuthority, lexiconsSchema.$nsid, nsid.toString()), { forceRefresh: opts.forceRefresh }).catch((err) => {
            throw new LexiconResolutionError(nsid, 'Could not resolve Lexicon schema record', { cause: err });
        });
        if (!lexiconsSchema.$matches(verified.record)) {
            throw new LexiconResolutionError(nsid, 'Invalid Lexicon schema record');
        }
        const validationResult = lex_document_1.lexiconDocumentSchema.safeValidate(verified.record);
        if (!validationResult.success) {
            throw new LexiconResolutionError(nsid, 'Invalid Lexicon document', {
                cause: validationResult.reason,
            });
        }
        const lexicon = validationResult.value;
        if (lexicon.id !== nsid.toString()) {
            throw new LexiconResolutionError(nsid, `Lexicon schema record id (${lexicon.id}) does not match NSID`);
        }
        const { uri, cid, commit } = verified;
        return { commit, uri, cid, nsid, lexicon };
    };
}
exports.resolveLexicon = buildLexiconResolver();
/**
 * Resolve the DID authority for a Lexicon from the network using DNS, based on its NSID.
 * @param input NSID or string representing one for which to lookup its Lexicon DID authority.
 */
async function resolveLexiconDidAuthority(input) {
    const nsid = syntax_1.NSID.from(input);
    const did = await resolveDns(nsid.authority);
    if (did == null || !lex_1.l.isDidString(did))
        return;
    return did;
}
class LexiconResolutionError extends Error {
    constructor(nsid, description = `Could not resolve Lexicon for NSID`, options) {
        super(`${description} (${nsid})`, options);
        Object.defineProperty(this, "nsid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: nsid
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: description
        });
        this.name = 'LexiconResolutionError';
    }
    static from(input, description, options) {
        const nsid = syntax_1.NSID.from(input);
        return new LexiconResolutionError(nsid, description, options);
    }
}
exports.LexiconResolutionError = LexiconResolutionError;
async function getDidAuthority(nsid, options) {
    if (options.didAuthority) {
        return options.didAuthority;
    }
    const did = await resolveLexiconDidAuthority(nsid);
    if (!did) {
        throw new LexiconResolutionError(nsid, `Could not resolve a DID authority for NSID`);
    }
    return did;
}
async function resolveDns(authority) {
    let chunkedResults;
    try {
        chunkedResults = await promises_1.default.resolveTxt(`${DNS_SUBDOMAIN}.${authority}`);
    }
    catch (err) {
        return undefined;
    }
    return parseDnsResult(chunkedResults);
}
function parseDnsResult(chunkedResults) {
    const results = chunkedResults.map((chunks) => chunks.join(''));
    const found = results.filter((i) => i.startsWith(DNS_PREFIX));
    if (found.length !== 1) {
        return undefined;
    }
    return found[0].slice(DNS_PREFIX.length);
}
//# sourceMappingURL=lexicon.js.map