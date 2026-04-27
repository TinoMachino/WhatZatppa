"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexiconSchemaBuilder = void 0;
exports.memoize = memoize;
const lex_schema_1 = require("@atproto/lex-schema");
/**
 * Builds validators for Lexicon documents.
 *
 * This class converts Lexicon type definitions into runtime validators
 * that can validate data against the schema. It handles reference resolution,
 * supporting both local (`#defName`) and cross-document (`nsid#defName`) refs.
 *
 * @example
 * ```ts
 * import { LexiconSchemaBuilder, LexiconIterableIndexer } from '@atproto/lex-document'
 *
 * // Build a single validator
 * const indexer = new LexiconIterableIndexer(lexiconDocs)
 * const validator = await LexiconSchemaBuilder.build(indexer, 'com.example.post#main')
 *
 * // Validate data
 * const result = validator.safeParse(myPostData)
 * if (result.success) {
 *   console.log('Valid:', result.value)
 * } else {
 *   console.log('Invalid:', result.error)
 * }
 * ```
 *
 * @example
 * ```ts
 * // Build all validators from an iterable indexer
 * const indexer = new LexiconIterableIndexer(lexiconDocs)
 * const allSchemas = await LexiconSchemaBuilder.buildAll(indexer)
 *
 * for (const [ref, schema] of allSchemas) {
 *   console.log(`Built validator for ${ref}`)
 * }
 * ```
 */
class LexiconSchemaBuilder {
    indexer;
    /**
     * Builds a validator for a single Lexicon definition reference.
     *
     * @param indexer - The Lexicon indexer to resolve documents from
     * @param fullRef - The full reference to build, in format "nsid#defName"
     * @returns A promise resolving to a validator for the referenced definition
     * @throws Error if the reference does not point to a schema type
     *
     * @example
     * ```ts
     * const validator = await LexiconSchemaBuilder.build(
     *   indexer,
     *   'app.bsky.feed.post#main'
     * )
     *
     * validator.parse(postRecord) // Throws if invalid
     * ```
     */
    static async build(indexer, fullRef) {
        const ctx = new LexiconSchemaBuilder(indexer);
        try {
            const result = await ctx.buildFullRef(fullRef);
            if (!(result instanceof lex_schema_1.l.Schema)) {
                throw new Error(`Ref ${fullRef} is not a schema type`);
            }
            return result;
        }
        finally {
            await ctx.done();
        }
    }
    /**
     * Builds validators for all definitions in all documents from an iterable indexer.
     *
     * This method iterates over all Lexicon documents available in the indexer
     * and builds validators for every definition in each document.
     *
     * @param indexer - An iterable Lexicon indexer (must implement `Symbol.asyncIterator`)
     * @returns A promise resolving to a Map of full references to their validators.
     *   The map values can be validators, Query, Subscription, Procedure, or PermissionSet.
     * @throws Error if the indexer does not support iteration
     *
     * @example
     * ```ts
     * const indexer = new LexiconIterableIndexer(allLexiconDocs)
     * const schemas = await LexiconSchemaBuilder.buildAll(indexer)
     *
     * // Access a specific schema
     * const postSchema = schemas.get('app.bsky.feed.post#main')
     *
     * // Iterate all schemas
     * for (const [ref, schema] of schemas) {
     *   console.log(ref, schema)
     * }
     * ```
     */
    static async buildAll(indexer) {
        const builder = new LexiconSchemaBuilder(indexer);
        const schemas = new Map();
        if (!isAsyncIterableObject(indexer)) {
            throw new Error('An iterable indexer is required to build all schemas');
        }
        try {
            for await (const doc of indexer) {
                for (const hash of Object.keys(doc.defs)) {
                    const fullRef = `${doc.id}#${hash}`;
                    const schema = await builder.buildFullRef(fullRef);
                    schemas.set(fullRef, schema);
                }
            }
            return schemas;
        }
        finally {
            await builder.done();
        }
    }
    #asyncTasks = new AsyncTasks();
    /**
     * Creates a new LexiconSchemaBuilder instance.
     *
     * Note: For most use cases, prefer using the static `build()` or `buildAll()`
     * methods instead of instantiating directly.
     *
     * @param indexer - The Lexicon indexer to resolve documents from
     */
    constructor(indexer) {
        this.indexer = indexer;
    }
    /**
     * Waits for all pending reference resolution tasks to complete.
     *
     * When building schemas with cross-references, the builder schedules
     * async tasks to resolve those references. This method must be called
     * to ensure all references are fully resolved before using the validators.
     *
     * @returns A promise that resolves when all pending tasks are complete
     * @throws Rethrows any errors from failed reference resolution
     */
    async done() {
        await this.#asyncTasks.done();
    }
    async [Symbol.asyncDispose]() {
        await this.done();
    }
    /**
     * Builds a validator for a full reference (memoized).
     *
     * Results are cached, so calling with the same reference returns
     * the same promise/result.
     *
     * @param fullRef - The full reference in format "nsid#defName"
     * @returns A promise resolving to the built schema or method definition
     */
    buildFullRef = memoize(async (fullRef) => {
        const { nsid, hash } = parseRef(fullRef);
        const doc = await this.indexer.get(nsid);
        return this.compileDef(doc, hash);
    });
    buildRefGetter(fullRef) {
        let schema;
        this.#asyncTasks.add(this.buildFullRef(fullRef).then((v) => {
            if (!(v instanceof lex_schema_1.l.Schema)) {
                throw new Error(`Only refs to schema types are allowed`);
            }
            schema = v;
        }));
        return () => {
            if (schema)
                return schema;
            throw new Error('Validator not yet built. Did you await done()?');
        };
    }
    buildTypedRefGetter(fullRef) {
        let validator;
        this.#asyncTasks.add(this.buildFullRef(fullRef).then((v) => {
            if (v instanceof lex_schema_1.l.TypedObjectSchema || v instanceof lex_schema_1.l.RecordSchema) {
                validator = v;
            }
            else {
                throw new Error('Only refs to records and object definitions are allowed');
            }
        }));
        return () => {
            if (validator)
                return validator;
            throw new Error('Validator not yet built. Did you await done()?');
        };
    }
    compileDef(doc, hash) {
        const def = Object.hasOwn(doc.defs, hash) ? doc.defs[hash] : null;
        if (!def) {
            throw new Error(`No definition found for hash "${JSON.stringify(hash)}" in ${doc.id}`);
        }
        switch (def.type) {
            case 'permission-set':
                return lex_schema_1.l.permissionSet(doc.id, def.permissions.map(({ resource, type, ...p }) => lex_schema_1.l.permission(resource, p)), def);
            case 'procedure':
                return lex_schema_1.l.procedure(doc.id, this.compileParams(doc, def.parameters), this.compilePayload(doc, def.input), this.compilePayload(doc, def.output), this.compileErrors(doc, def.errors));
            case 'query':
                return lex_schema_1.l.query(doc.id, this.compileParams(doc, def.parameters), this.compilePayload(doc, def.output), this.compileErrors(doc, def.errors));
            case 'subscription':
                return lex_schema_1.l.subscription(doc.id, this.compileParams(doc, def.parameters), this.compilePayloadSchema(doc, def.message.schema), this.compileErrors(doc, def.errors));
            case 'token':
                return lex_schema_1.l.token(doc.id, hash);
            case 'record':
                return lex_schema_1.l.record(def.key, doc.id, this.compileObject(doc, def.record));
            case 'object':
                return lex_schema_1.l.typedObject(doc.id, hash, this.compileObject(doc, def));
            default:
                return this.compileLeaf(doc, def);
        }
    }
    compileLeaf(doc, def) {
        if ('const' in def &&
            'enum' in def &&
            def.enum != null &&
            def.const !== undefined &&
            !def.enum.includes(def.const)) {
            return lex_schema_1.l.never();
        }
        switch (def.type) {
            case 'string': {
                const schema = lex_schema_1.l.string(def);
                if (def.default != null)
                    schema.check(def.default);
                if (def.const != null)
                    schema.check(def.const);
                if (def.enum != null)
                    for (const v of def.enum)
                        schema.check(v);
                const result = def.const != null
                    ? lex_schema_1.l.literal(def.const)
                    : def.enum != null
                        ? lex_schema_1.l.enum(def.enum)
                        : schema;
                return def.default != null ? lex_schema_1.l.withDefault(result, def.default) : result;
            }
            case 'integer': {
                const schema = lex_schema_1.l.integer(def);
                if (def.default != null)
                    schema.check(def.default);
                if (def.const != null)
                    schema.check(def.const);
                if (def.enum != null)
                    for (const v of def.enum)
                        schema.check(v);
                const result = def.const != null
                    ? lex_schema_1.l.literal(def.const)
                    : def.enum != null
                        ? lex_schema_1.l.enum(def.enum)
                        : schema;
                return def.default != null ? lex_schema_1.l.withDefault(result, def.default) : result;
            }
            case 'boolean': {
                const result = def.const != null ? lex_schema_1.l.literal(def.const) : lex_schema_1.l.boolean();
                return def.default != null ? lex_schema_1.l.withDefault(result, def.default) : result;
            }
            case 'blob':
                return lex_schema_1.l.blob(def);
            case 'cid-link':
                return lex_schema_1.l.cid();
            case 'bytes':
                return lex_schema_1.l.bytes(def);
            case 'unknown':
                return lex_schema_1.l.lexMap();
            case 'array':
                return lex_schema_1.l.array(this.compileLeaf(doc, def.items), def);
            default:
                return this.compileRef(doc, def);
        }
    }
    compileRef(doc, def) {
        switch (def.type) {
            case 'ref':
                return lex_schema_1.l.ref(this.buildRefGetter(buildFullRef(doc, def.ref)));
            case 'union':
                return lex_schema_1.l.typedUnion(def.refs.map((r) => lex_schema_1.l.typedRef(this.buildTypedRefGetter(buildFullRef(doc, r)))), def.closed ?? false);
            default:
                // @ts-expect-error
                throw new Error(`Unknown lexicon type: ${def.type}`);
        }
    }
    compileObject(doc, def) {
        const props = {};
        for (const [key, propDef] of Object.entries(def.properties)) {
            if (propDef === undefined)
                continue;
            const isNullable = def.nullable?.includes(key);
            const isRequired = def.required?.includes(key);
            let schema = this.compileLeaf(doc, propDef);
            if (isNullable) {
                schema = lex_schema_1.l.nullable(schema);
            }
            if (!isRequired) {
                schema = lex_schema_1.l.optional(schema);
            }
            props[key] = schema;
        }
        return lex_schema_1.l.object(props);
    }
    compilePayload(doc, def) {
        return lex_schema_1.l.payload(def?.encoding, def?.schema ? this.compilePayloadSchema(doc, def.schema) : undefined);
    }
    compileErrors(_doc, errors) {
        return errors?.map((e) => e.name);
    }
    compilePayloadSchema(doc, def) {
        switch (def.type) {
            case 'object':
                return this.compileObject(doc, def);
            default:
                return this.compileRef(doc, def);
        }
    }
    compileParams(doc, def) {
        if (!def)
            return lex_schema_1.l.params();
        const shape = {};
        for (const [paramName, paramDef] of Object.entries(def.properties)) {
            if (paramDef === undefined)
                continue;
            const isRequired = def.required?.includes(paramName);
            const propSchema = this.compileLeaf(doc, paramDef);
            shape[paramName] = isRequired ? propSchema : lex_schema_1.l.optional(propSchema);
        }
        return lex_schema_1.l.params(shape);
    }
}
exports.LexiconSchemaBuilder = LexiconSchemaBuilder;
class AsyncTasks {
    /**
     * A set that, eventually, contains only rejected promises.
     */
    #promises = new Set();
    async done() {
        do {
            // @NOTE this is going to throw on the first rejected promise (which is
            // what we want)
            for (const p of this.#promises)
                await p;
            // At this point, all settled promises should have been removed. If
            // this.#promises is not empty, it means new promises were added during
            // the awaiting process, so we loop again.
        } while (this.#promises.size > 0);
    }
    add(p) {
        const promise = Promise.resolve(p).then(() => {
            // No need to keep the promise any longer
            this.#promises.delete(promise);
        });
        void promise.catch((_err) => {
            // ignore errors here, they should be caught though done()
        });
        this.#promises.add(promise);
    }
}
function parseRef(fullRef) {
    const { length, 0: nsid, 1: hash } = fullRef.split('#');
    if (length !== 2)
        throw new Error('Uri can only have one hash segment');
    if (!nsid || !hash)
        throw new Error('Invalid ref, missing hash');
    return { nsid, hash };
}
function buildFullRef(from, ref) {
    if (ref.startsWith('#'))
        return `${from.id}${ref}`;
    return ref;
}
function memoize(fn) {
    const cache = new Map();
    return ((arg) => {
        if (cache.has(arg))
            return cache.get(arg);
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    });
}
function isAsyncIterableObject(obj) {
    return (obj != null &&
        typeof obj === 'object' &&
        Symbol.asyncIterator in obj &&
        typeof obj[Symbol.asyncIterator] === 'function');
}
//# sourceMappingURL=lexicon-schema-builder.js.map