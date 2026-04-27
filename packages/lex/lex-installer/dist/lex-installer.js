"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexInstaller = void 0;
const node_path_1 = require("node:path");
const lex_builder_1 = require("@atproto/lex-builder");
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
const lex_resolver_1 = require("@atproto/lex-resolver");
const syntax_1 = require("@atproto/syntax");
const fs_js_1 = require("./fs.js");
const lexicons_manifest_js_1 = require("./lexicons-manifest.js");
const nsid_map_js_1 = require("./nsid-map.js");
const nsid_set_js_1 = require("./nsid-set.js");
/**
 * Manages the installation of Lexicon schemas from the AT Protocol network.
 *
 * The `LexInstaller` class handles fetching, caching, and organizing lexicon
 * documents. It tracks dependencies between lexicons and ensures all referenced
 * schemas are installed. The class implements `AsyncDisposable` for proper
 * resource cleanup.
 *
 * @example
 * Basic usage with async disposal:
 * ```typescript
 * import { LexInstaller } from '@atproto/lex-installer'
 *
 * await using installer = new LexInstaller({
 *   lexicons: './lexicons',
 *   manifest: './lexicons.manifest.json',
 * })
 *
 * await installer.install({
 *   additions: ['app.bsky.feed.post'],
 * })
 *
 * await installer.save()
 * // Resources automatically cleaned up when block exits
 * ```
 *
 * @example
 * Manual disposal:
 * ```typescript
 * const installer = new LexInstaller({
 *   lexicons: './lexicons',
 *   manifest: './lexicons.manifest.json',
 * })
 *
 * try {
 *   await installer.install({ additions: ['app.bsky.actor.profile'] })
 *   await installer.save()
 * } finally {
 *   await installer[Symbol.asyncDispose]()
 * }
 * ```
 */
class LexInstaller {
    options;
    lexiconResolver;
    indexer;
    documents = new nsid_map_js_1.NsidMap();
    manifest = {
        version: 1,
        lexicons: [],
        resolutions: {},
    };
    constructor(options) {
        this.options = options;
        this.lexiconResolver = new lex_resolver_1.LexResolver(options);
        this.indexer = new lex_builder_1.LexiconDirectoryIndexer({
            lexicons: options.lexicons,
        });
    }
    async [Symbol.asyncDispose]() {
        await this.indexer[Symbol.asyncDispose]();
    }
    /**
     * Compares the current manifest state with another manifest for equality.
     *
     * Both manifests are normalized before comparison to ensure consistent
     * ordering of entries. Useful for detecting changes during CI verification.
     *
     * @param manifest - The manifest to compare against
     * @returns `true` if the manifests are equivalent, `false` otherwise
     */
    equals(manifest) {
        return (0, lex_data_1.lexEquals)((0, lexicons_manifest_js_1.normalizeLexiconsManifest)(manifest), (0, lexicons_manifest_js_1.normalizeLexiconsManifest)(this.manifest));
    }
    /**
     * Installs lexicons and their dependencies.
     *
     * This method processes explicit additions and restores entries from an
     * existing manifest. It recursively resolves and installs all referenced
     * lexicons to ensure complete dependency trees.
     *
     * @param options - Installation options
     * @param options.additions - Iterable of lexicon identifiers to add.
     *   Can be NSID strings or AT URIs.
     * @param options.manifest - Existing manifest to use as a baseline.
     *   Previously resolved URIs are preserved unless explicitly overridden.
     *
     * @example
     * Install new lexicons:
     * ```typescript
     * await installer.install({
     *   additions: ['app.bsky.feed.post', 'app.bsky.actor.profile'],
     * })
     * ```
     *
     * @example
     * Install with existing manifest as hint:
     * ```typescript
     * const existingManifest = await readJsonFile('./lexicons.manifest.json')
     * await installer.install({
     *   additions: ['com.example.newLexicon'],
     *   manifest: existingManifest,
     * })
     * ```
     *
     * @example
     * Install from specific AT URIs:
     * ```typescript
     * await installer.install({
     *   additions: [
     *     'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post',
     *   ],
     * })
     * ```
     */
    async install({ additions, manifest, } = {}) {
        const roots = new nsid_map_js_1.NsidMap();
        // First, process explicit additions
        for (const lexicon of new Set(additions)) {
            const [nsid, uri] = lexicon.startsWith('at://')
                ? ((uri) => [syntax_1.NSID.from(uri.rkey), uri])(new syntax_1.AtUri(lexicon))
                : [syntax_1.NSID.from(lexicon), null];
            if (roots.has(nsid)) {
                throw new Error(`Duplicate lexicon addition: ${nsid} (${roots.get(nsid) ?? lexicon})`);
            }
            roots.set(nsid, uri);
            console.debug(`Adding new lexicon: ${nsid} (${uri ?? 'from NSID'})`);
        }
        // Next, restore previously existing manifest entries
        if (manifest) {
            for (const lexicon of manifest.lexicons) {
                const nsid = syntax_1.NSID.from(lexicon);
                // Skip entries already added explicitly
                if (!roots.has(nsid)) {
                    const uri = manifest.resolutions[lexicon]
                        ? new syntax_1.AtUri(manifest.resolutions[lexicon].uri)
                        : null;
                    roots.set(nsid, uri);
                    console.debug(`Adding lexicon from manifest: ${nsid} (${uri ?? 'from NSID'})`);
                }
            }
        }
        // Install all root lexicons (and store them in the manifest)
        await Promise.all(Array.from(roots, async ([nsid, sourceUri]) => {
            console.debug(`Installing lexicon: ${nsid}`);
            const { lexicon: document } = sourceUri
                ? await this.installFromUri(sourceUri)
                : await this.installFromNsid(nsid);
            // Store the direct reference in the new manifest
            this.manifest.lexicons.push(document.id);
        }));
        // Then recursively install all referenced lexicons
        let results;
        do {
            results = await Promise.all(Array.from(this.getMissingIds(), async (nsid) => {
                console.debug(`Resolving dependency lexicon: ${nsid}`);
                const nsidStr = nsid.toString();
                const resolvedUri = manifest?.resolutions[nsidStr]?.uri
                    ? new syntax_1.AtUri(manifest.resolutions[nsidStr].uri)
                    : null;
                if (resolvedUri) {
                    await this.installFromUri(resolvedUri);
                }
                else {
                    await this.installFromNsid(nsid);
                }
            }));
        } while (results.length > 0);
    }
    getMissingIds() {
        const missing = new nsid_set_js_1.NsidSet();
        for (const document of this.documents.values()) {
            for (const nsid of listDocumentNsidRefs(document)) {
                if (!this.documents.has(nsid)) {
                    missing.add(nsid);
                }
            }
        }
        return missing;
    }
    async installFromNsid(nsid) {
        const uri = await this.lexiconResolver.resolve(nsid);
        return this.installFromUri(uri);
    }
    async installFromUri(uri) {
        const { lexicon, cid } = this.options.update
            ? await this.fetch(uri)
            : await this.indexer.get(uri.rkey).then(async (lexicon) => {
                console.debug(`Re-using existing lexicon ${uri.rkey} from indexer`);
                const cid = await (0, lex_cbor_1.cidForLex)(lexicon);
                return { cid, lexicon };
            }, (err) => {
                if ((0, fs_js_1.isEnoentError)(err))
                    return this.fetch(uri);
                throw err;
            });
        this.documents.set(syntax_1.NSID.from(lexicon.id), lexicon);
        this.manifest.resolutions[lexicon.id] = {
            cid: cid.toString(),
            uri: uri.toString(),
        };
        return { lexicon, uri };
    }
    /**
     * Fetches a lexicon document from the network and saves it locally.
     *
     * The lexicon is retrieved from the specified AT URI, written to the
     * local lexicons directory, and its metadata is recorded for the manifest.
     *
     * @param uri - The AT URI pointing to the lexicon document
     * @returns An object containing the fetched lexicon document and its CID
     */
    async fetch(uri) {
        console.debug(`Fetching lexicon from ${uri}...`);
        const { lexicon, cid } = await this.lexiconResolver.fetch(uri, {
            noCache: this.options.update,
        });
        const basePath = (0, node_path_1.join)(this.options.lexicons, ...lexicon.id.split('.'));
        await (0, fs_js_1.writeJsonFile)(`${basePath}.json`, lexicon);
        return { lexicon, cid };
    }
    /**
     * Saves the current manifest to disk.
     *
     * The manifest is normalized before saving to ensure consistent ordering
     * of entries, making it suitable for version control.
     */
    async save() {
        await (0, fs_js_1.writeJsonFile)(this.options.manifest, (0, lexicons_manifest_js_1.normalizeLexiconsManifest)(this.manifest));
    }
}
exports.LexInstaller = LexInstaller;
function* listDocumentNsidRefs(doc) {
    try {
        for (const def of Object.values(doc.defs)) {
            if (def) {
                for (const ref of defRefs(def)) {
                    const [nsid] = ref.split('#', 1);
                    if (nsid)
                        yield syntax_1.NSID.from(nsid);
                }
            }
        }
    }
    catch (cause) {
        throw new Error(`Failed to extract refs from lexicon ${doc.id}`, { cause });
    }
}
function* defRefs(def) {
    switch (def.type) {
        case 'string':
            if (def.knownValues) {
                for (const val of def.knownValues) {
                    // Tokens ?
                    const { length, 0: nsid, 1: hash } = val.split('#');
                    if (length === 2 && hash) {
                        try {
                            syntax_1.NSID.from(nsid);
                            yield val;
                        }
                        catch {
                            // ignore invalid nsid
                        }
                    }
                }
            }
            return;
        case 'array':
            return yield* defRefs(def.items);
        case 'params':
        case 'object':
            for (const prop of Object.values(def.properties)) {
                yield* defRefs(prop);
            }
            return;
        case 'union':
            yield* def.refs;
            return;
        case 'ref': {
            yield def.ref;
            return;
        }
        case 'record':
            yield* defRefs(def.record);
            return;
        case 'procedure':
            if (def.input?.schema) {
                yield* defRefs(def.input.schema);
            }
        // fallthrough
        case 'query':
            if (def.output?.schema) {
                yield* defRefs(def.output.schema);
            }
        // fallthrough
        case 'subscription':
            if (def.parameters) {
                yield* defRefs(def.parameters);
            }
            if ('message' in def && def.message?.schema) {
                yield* defRefs(def.message.schema);
            }
            return;
        case 'permission-set':
            for (const permission of def.permissions) {
                yield* defRefs(permission);
            }
            return;
        case 'permission':
            if (def.resource === 'rpc') {
                if (Array.isArray(def.lxm)) {
                    for (const lxm of def.lxm) {
                        if (typeof lxm === 'string') {
                            yield lxm;
                        }
                    }
                }
            }
            else if (def.resource === 'repo') {
                if (Array.isArray(def.collection)) {
                    for (const lxm of def.collection) {
                        if (typeof lxm === 'string') {
                            yield lxm;
                        }
                    }
                }
            }
            return;
        case 'boolean':
        case 'cid-link':
        case 'token':
        case 'bytes':
        case 'blob':
        case 'integer':
        case 'unknown':
            // @NOTE We explicitly list all types here to ensure exhaustiveness
            // causing TS to error if a new type is added without updating this switch
            return;
        default:
            // @ts-expect-error
            throw new Error(`Unknown lexicon def type: ${def.type}`);
    }
}
//# sourceMappingURL=lex-installer.js.map