"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexDefBuilder = void 0;
const ts_morph_1 = require("ts-morph");
const lex_schema_1 = require("@atproto/lex-schema");
const ref_resolver_js_1 = require("./ref-resolver.js");
const ts_lang_js_1 = require("./ts-lang.js");
/**
 * Builds TypeScript type definitions and runtime schemas from a single
 * Lexicon document.
 *
 * This class is responsible for generating the `.defs.ts` files that contain:
 * - Type aliases for each lexicon definition
 * - Runtime schema validators using `@atproto/lex-schema`
 * - Utility functions for type checking and validation
 * - Proper import statements for cross-references
 *
 * Each lexicon definition type (record, object, query, procedure, etc.)
 * is handled with specialized code generation logic.
 */
class LexDefBuilder {
    options;
    file;
    doc;
    refResolver;
    constructor(options, file, doc, indexer) {
        this.options = options;
        this.file = file;
        this.doc = doc;
        this.refResolver = new ref_resolver_js_1.RefResolver(doc, file, indexer, options);
    }
    pure(code) {
        return this.options.pureAnnotations ? markPure(code) : code;
    }
    async build() {
        this.file.addVariableStatement({
            declarationKind: ts_morph_1.VariableDeclarationKind.Const,
            declarations: [
                { name: '$nsid', initializer: JSON.stringify(this.doc.id) },
            ],
        });
        this.file.addExportDeclaration({
            namedExports: [{ name: '$nsid' }],
        });
        const defs = Object.keys(this.doc.defs);
        if (defs.length) {
            const moduleSpecifier = this.options?.lib ?? '@atproto/lex-schema';
            this.file
                .addImportDeclaration({ moduleSpecifier })
                .addNamedImports([{ name: 'l' }]);
            for (const hash of defs) {
                await this.addDef(hash);
            }
        }
    }
    addUtils(definitions) {
        const entries = Object.entries(definitions).filter((e) => e[1] != null);
        if (entries.length) {
            this.file.addVariableStatement({
                isExported: true,
                declarationKind: ts_morph_1.VariableDeclarationKind.Const,
                declarations: entries.map(([name, initializer]) => ({
                    name,
                    initializer,
                })),
            });
        }
    }
    async addDef(hash) {
        const def = Object.hasOwn(this.doc.defs, hash) ? this.doc.defs[hash] : null;
        if (def == null)
            return;
        switch (def.type) {
            case 'permission-set':
                return this.addPermissionSet(hash, def);
            case 'procedure':
                return this.addProcedure(hash, def);
            case 'query':
                return this.addQuery(hash, def);
            case 'subscription':
                return this.addSubscription(hash, def);
            case 'record':
                return this.addRecord(hash, def);
            case 'token':
                return this.addToken(hash, def);
            case 'object':
                return this.addObject(hash, def);
            case 'array':
                return this.addArray(hash, def);
            default:
                await this.addSchema(hash, def, {
                    type: await this.compileContainedType(def),
                    schema: await this.compileContainedSchema(def),
                    validationUtils: true,
                });
        }
    }
    async addPermissionSet(hash, def) {
        const permission = def.permissions.map((def) => {
            const options = stringifyOptions(def, undefined, ['resource', 'type']);
            return this.pure(`l.permission(${JSON.stringify(def.resource)}, ${options})`);
        });
        const options = stringifyOptions(def, [
            'title',
            'title:lang',
            'detail',
            'detail:lang',
        ]);
        await this.addSchema(hash, def, {
            schema: this.pure(`l.permissionSet($nsid, [${permission.join(',')}], ${options})`),
        });
    }
    async addProcedure(hash, def) {
        if (hash !== 'main') {
            throw new Error(`Definition ${hash} cannot be of type ${def.type}`);
        }
        // @TODO Build the types instead of using an inferred type.
        const ref = await this.addSchema(hash, def, {
            schema: this.pure(`
        l.procedure(
          $nsid,
          ${await this.compileParamsSchema(def.parameters)},
          ${await this.compilePayload(def.input)},
          ${await this.compilePayload(def.output)},
          ${await this.compileErrors(def.errors)}
        )
      `),
        });
        this.addMethodTypeUtils(ref, def);
        this.addUtils({
            $lxm: this.pure(`${ref.varName}.nsid`),
            $params: this.pure(`${ref.varName}.parameters`),
            $input: this.pure(`${ref.varName}.input`),
            $output: this.pure(`${ref.varName}.output`),
        });
    }
    async addQuery(hash, def) {
        if (hash !== 'main') {
            throw new Error(`Definition ${hash} cannot be of type ${def.type}`);
        }
        // @TODO Build the types instead of using an inferred type.
        const ref = await this.addSchema(hash, def, {
            schema: this.pure(`
        l.query(
          $nsid,
          ${await this.compileParamsSchema(def.parameters)},
          ${await this.compilePayload(def.output)},
          ${await this.compileErrors(def.errors)}
        )
      `),
        });
        this.addMethodTypeUtils(ref, def);
        this.addUtils({
            $lxm: this.pure(`${ref.varName}.nsid`),
            $params: `${ref.varName}.parameters`,
            $output: `${ref.varName}.output`,
        });
    }
    async addSubscription(hash, def) {
        if (hash !== 'main') {
            throw new Error(`Definition ${hash} cannot be of type ${def.type}`);
        }
        // @TODO Build the types instead of using an inferred type.
        const ref = await this.addSchema(hash, def, {
            schema: this.pure(`
        l.subscription(
          $nsid,
          ${await this.compileParamsSchema(def.parameters)},
          ${await this.compileBodySchema(def.message?.schema)},
          ${await this.compileErrors(def.errors)}
        )
      `),
        });
        this.addMethodTypeUtils(ref, def);
        this.addUtils({
            $lxm: this.pure(`${ref.varName}.nsid`),
            $params: `${ref.varName}.parameters`,
            $message: `${ref.varName}.message`,
        });
    }
    addMethodTypeUtils(ref, def) {
        this.file.addTypeAlias({
            isExported: true,
            name: '$Params',
            type: `l.InferMethodParams<typeof ${ref.varName}>`,
            docs: compileDocs(def.parameters?.description),
        });
        if (def.type === 'procedure') {
            this.file.addTypeAlias({
                isExported: true,
                name: '$Input<B = l.BinaryData>',
                type: `l.InferMethodInput<typeof ${ref.varName}, B>`,
                docs: compileDocs(def.input?.description),
            });
            this.file.addTypeAlias({
                isExported: true,
                name: '$InputBody<B = l.BinaryData>',
                type: `l.InferMethodInputBody<typeof ${ref.varName}, B>`,
                docs: compileDocs(def.input?.description),
            });
        }
        if (def.type === 'procedure' || def.type === 'query') {
            this.file.addTypeAlias({
                isExported: true,
                name: '$Output<B = l.BinaryData>',
                type: `l.InferMethodOutput<typeof ${ref.varName}, B>`,
                docs: compileDocs(def.output?.description),
            });
            this.file.addTypeAlias({
                isExported: true,
                name: '$OutputBody<B = l.BinaryData>',
                type: `l.InferMethodOutputBody<typeof ${ref.varName}, B>`,
                docs: compileDocs(def.output?.description),
            });
        }
        if (def.type === 'subscription') {
            this.file.addTypeAlias({
                isExported: true,
                name: '$Message',
                type: `l.InferSubscriptionMessage<typeof ${ref.varName}>`,
                docs: compileDocs(def.message?.description),
            });
        }
    }
    async addRecord(hash, def) {
        if (hash !== 'main') {
            throw new Error(`Definition ${hash} cannot be of type ${def.type}`);
        }
        const key = JSON.stringify(def.key ?? 'any');
        const objectSchema = await this.compileObjectSchema(def.record);
        const properties = await this.compilePropertiesTypes(def.record);
        properties.unshift(`$type: ${JSON.stringify(lex_schema_1.l.$type(this.doc.id, hash))}`);
        await this.addSchema(hash, def, {
            type: `{ ${properties.join(';')} }`,
            schema: (ref) => this.pure(`l.record<${key}, ${ref.typeName}>(${key}, $nsid, ${objectSchema})`),
            objectUtils: true,
            validationUtils: true,
        });
    }
    async addObject(hash, def) {
        const objectSchema = await this.compileObjectSchema(def);
        const properties = await this.compilePropertiesTypes(def);
        properties.unshift(`$type?: ${JSON.stringify(lex_schema_1.l.$type(this.doc.id, hash))}`);
        await this.addSchema(hash, def, {
            type: `{ ${properties.join(';')} }`,
            schema: (ref) => this.pure(`l.typedObject<${ref.typeName}>($nsid, ${JSON.stringify(hash)}, ${objectSchema})`),
            objectUtils: true,
            validationUtils: true,
        });
    }
    async addToken(hash, def) {
        await this.addSchema(hash, def, {
            schema: this.pure(`l.token($nsid, ${JSON.stringify(hash)})`),
            type: JSON.stringify(lex_schema_1.l.$type(this.doc.id, hash)),
            validationUtils: true,
        });
    }
    async addArray(hash, def) {
        // @TODO It could be nice to expose the array item type as a separate type.
        // This was not done (yet) as there is no easy way to name it to avoid
        // collisions.
        const itemSchema = await this.compileContainedSchema(def.items);
        const options = stringifyOptions(def, [
            'minLength',
            'maxLength',
        ]);
        await this.addSchema(hash, def, {
            type: `(${await this.compileContainedType(def.items)})[]`,
            // @NOTE Not using compileArraySchema to allow specifying the generic
            // parameter to l.array<>.
            schema: (ref) => this.pure(`l.array<${ref.typeName}[number]>(${itemSchema}, ${options})`),
            validationUtils: true,
        });
    }
    async addSchema(hash, def, { type, schema, objectUtils, validationUtils, }) {
        const ref = await this.refResolver.resolveLocal(hash);
        const pub = (0, ref_resolver_js_1.getPublicIdentifiers)(hash);
        if (type) {
            this.file.addTypeAlias({
                name: ref.typeName,
                type: typeof type === 'function' ? type(ref) : type,
                docs: compileDocs(def.description),
            });
            this.file.addExportDeclaration({
                isTypeOnly: true,
                namedExports: [
                    {
                        name: ref.typeName,
                        alias: ref.typeName === pub.typeName
                            ? undefined
                            : (0, ts_lang_js_1.asNamespaceExport)(pub.typeName),
                    },
                ],
            });
        }
        if (schema) {
            this.file.addVariableStatement({
                declarationKind: ts_morph_1.VariableDeclarationKind.Const,
                declarations: [
                    {
                        name: ref.varName,
                        initializer: typeof schema === 'function' ? schema(ref) : schema,
                    },
                ],
                docs: compileDocs(def.description),
            });
            this.file.addExportDeclaration({
                namedExports: [
                    {
                        name: ref.varName,
                        alias: ref.varName === pub.varName
                            ? undefined
                            : (0, ts_lang_js_1.asNamespaceExport)(pub.varName),
                    },
                ],
            });
        }
        if (hash === 'main' && objectUtils) {
            this.addUtils({
                $isTypeOf: markPure(`${ref.varName}.isTypeOf.bind(${ref.varName})`),
                $build: markPure(`${ref.varName}.build.bind(${ref.varName})`),
                $type: markPure(`${ref.varName}.$type`),
            });
        }
        if (hash === 'main' && validationUtils) {
            this.addUtils({
                $assert: markPure(`${ref.varName}.assert.bind(${ref.varName})`),
                $check: markPure(`${ref.varName}.check.bind(${ref.varName})`),
                $cast: markPure(`${ref.varName}.cast.bind(${ref.varName})`),
                $ifMatches: markPure(`${ref.varName}.ifMatches.bind(${ref.varName})`),
                $matches: markPure(`${ref.varName}.matches.bind(${ref.varName})`),
                $parse: markPure(`${ref.varName}.parse.bind(${ref.varName})`),
                $safeParse: markPure(`${ref.varName}.safeParse.bind(${ref.varName})`),
                $validate: markPure(`${ref.varName}.validate.bind(${ref.varName})`),
                $safeValidate: markPure(`${ref.varName}.safeValidate.bind(${ref.varName})`),
            });
        }
        return ref;
    }
    async compilePayload(def) {
        if (!def)
            return this.pure(`l.payload()`);
        // Special case for JSON object payloads
        if (def.encoding === 'application/json' && def.schema?.type === 'object') {
            const properties = await this.compilePropertiesSchemas(def.schema);
            return this.pure(`l.jsonPayload({${properties.join(',')}})`);
        }
        const encodedEncoding = JSON.stringify(def.encoding);
        if (def.schema) {
            const bodySchema = await this.compileBodySchema(def.schema);
            return this.pure(`l.payload(${encodedEncoding}, ${bodySchema})`);
        }
        else {
            return this.pure(`l.payload(${encodedEncoding})`);
        }
    }
    async compileBodySchema(def) {
        if (!def)
            return 'undefined';
        if (def.type === 'object')
            return this.compileObjectSchema(def);
        return this.compileContainedSchema(def);
    }
    async compileParamsSchema(def) {
        if (!def)
            return this.pure(`l.params()`);
        const properties = await this.compilePropertiesSchemas(def);
        return this.pure(properties.length === 0
            ? `l.params()`
            : `l.params({${properties.join(',')}})`);
    }
    async compileErrors(defs) {
        if (!defs?.length)
            return '';
        return JSON.stringify(defs.map((d) => d.name));
    }
    async compileObjectSchema(def) {
        const properties = await this.compilePropertiesSchemas(def);
        return this.pure(`l.object({${properties.join(',')}})`);
    }
    async compilePropertiesSchemas(options) {
        for (const opt of ['required', 'nullable']) {
            if (options[opt]) {
                for (const prop of options[opt]) {
                    if (!Object.hasOwn(options.properties, prop)) {
                        throw new Error(`No schema found for ${opt} property "${prop}"`);
                    }
                }
            }
        }
        return Promise.all(Object.entries(options.properties).map((entry) => {
            return this.compilePropertyEntrySchema(entry, options);
        }));
    }
    async compilePropertiesTypes(options) {
        return Promise.all(Object.entries(options.properties).map((entry) => {
            return this.compilePropertyEntryType(entry, options);
        }));
    }
    async compilePropertyEntrySchema([key, def], options) {
        const isNullable = options.nullable?.includes(key);
        const isRequired = options.required?.includes(key);
        let schema = await this.compileContainedSchema(def);
        if (isNullable) {
            schema = this.pure(`l.nullable(${schema})`);
        }
        if (!isRequired) {
            schema = this.pure(`l.optional(${schema})`);
        }
        return `${JSON.stringify(key)}:${schema}`;
    }
    async compilePropertyEntryType([key, def], options) {
        const isNullable = options.nullable?.includes(key);
        const isRequired = options.required?.includes(key);
        const optional = isRequired ? '' : '?';
        const append = isNullable ? ' | null' : '';
        const jsDoc = compileLeadingTrivia(def.description) || '';
        const name = JSON.stringify(key);
        const type = await this.compileContainedType(def);
        return `${jsDoc}${name}${optional}:${type}${append}`;
    }
    async compileContainedSchema(def) {
        switch (def.type) {
            case 'unknown':
                return this.compileUnknownSchema(def);
            case 'boolean':
                return this.compileBooleanSchema(def);
            case 'integer':
                return this.compileIntegerSchema(def);
            case 'string':
                return this.compileStringSchema(def);
            case 'bytes':
                return this.compileBytesSchema(def);
            case 'blob':
                return this.compileBlobSchema(def);
            case 'cid-link':
                return this.compileCidLinkSchema(def);
            case 'ref':
                return this.compileRefSchema(def);
            case 'union':
                return this.compileRefUnionSchema(def);
            case 'array':
                return this.compileArraySchema(def);
            default:
                // @ts-expect-error
                throw new Error(`Unsupported def type: ${def.type}`);
        }
    }
    async compileContainedType(def) {
        switch (def.type) {
            case 'unknown':
                return this.compileUnknownType(def);
            case 'boolean':
                return this.compileBooleanType(def);
            case 'integer':
                return this.compileIntegerType(def);
            case 'string':
                return this.compileStringType(def);
            case 'bytes':
                return this.compileBytesType(def);
            case 'blob':
                return this.compileBlobType(def);
            case 'cid-link':
                return this.compileCidLinkType(def);
            case 'ref':
                return this.compileRefType(def);
            case 'union':
                return this.compileRefUnionType(def);
            case 'array':
                return this.compileArrayType(def);
            default:
                // @ts-expect-error
                throw new Error(`Unsupported def type: ${def.type}`);
        }
    }
    async compileArraySchema(def) {
        const itemSchema = await this.compileContainedSchema(def.items);
        const options = stringifyOptions(def, [
            'minLength',
            'maxLength',
        ]);
        return this.pure(`l.array(${itemSchema}, ${options})`);
    }
    async compileArrayType(def) {
        return `(${await this.compileContainedType(def.items)})[]`;
    }
    async compileUnknownSchema(_def) {
        return this.pure(`l.lexMap()`);
    }
    async compileUnknownType(_def) {
        return `l.LexMap`;
    }
    withDefault(schema, defaultValue) {
        if (defaultValue === undefined)
            return schema;
        return this.pure(`l.withDefault(${schema}, ${JSON.stringify(defaultValue)})`);
    }
    async compileBooleanSchema(def) {
        const schema = lex_schema_1.l.boolean();
        if (def.default !== undefined) {
            schema.check(def.default);
        }
        if (hasConst(def))
            return this.compileConstSchema(def);
        return this.withDefault(this.pure(`l.boolean()`), def.default);
    }
    async compileBooleanType(def) {
        if (hasConst(def))
            return this.compileConstType(def);
        return 'boolean';
    }
    async compileIntegerSchema(def) {
        const schema = lex_schema_1.l.integer(def);
        if (hasConst(def)) {
            schema.check(def.const);
        }
        if (hasEnum(def)) {
            for (const val of def.enum)
                schema.check(val);
        }
        if (def.default !== undefined) {
            schema.check(def.default);
        }
        if (hasConst(def))
            return this.compileConstSchema(def);
        if (hasEnum(def))
            return this.compileEnumSchema(def);
        const options = stringifyOptions(def, [
            'maximum',
            'minimum',
        ]);
        return this.withDefault(this.pure(`l.integer(${options})`), def.default);
    }
    async compileIntegerType(def) {
        if (hasConst(def))
            return this.compileConstType(def);
        if (hasEnum(def))
            return this.compileEnumType(def);
        return 'number';
    }
    async compileStringSchema(def) {
        const schema = lex_schema_1.l.string(def);
        if (hasConst(def)) {
            schema.check(def.const);
        }
        if (hasEnum(def)) {
            for (const val of def.enum)
                schema.check(val);
        }
        if (def.default !== undefined) {
            schema.check(def.default);
        }
        if (hasConst(def))
            return this.compileConstSchema(def);
        if (hasEnum(def))
            return this.compileEnumSchema(def);
        const runtimeOptions = [
            'format',
            'maxGraphemes',
            'minGraphemes',
            'maxLength',
            'minLength',
            // We don't want to include knownValues in the schema options **at
            // runtime** as it has no effect and only causes bloat:
            // "knownValues",
        ];
        const options = stringifyOptions(def, runtimeOptions);
        // We *do* however need knownValues for the inferred type, so we include it
        // as the generic parameter. We only do this if the def has knownValues,
        // otherwise we let TypeScript infer the options generic by not defining it.
        const generic = def.knownValues
            ? stringifyOptions(def, [
                ...runtimeOptions,
                'knownValues',
            ])
            : undefined;
        return this.withDefault(this.pure(`l.string${generic ? `<${generic}>` : ''}(${options})`), def.default);
    }
    async compileStringType(def) {
        if (hasConst(def))
            return this.compileConstType(def);
        if (hasEnum(def))
            return this.compileEnumType(def);
        switch (def.format) {
            case undefined:
                break;
            case 'datetime':
                return 'l.DatetimeString';
            case 'uri':
                return 'l.UriString';
            case 'at-uri':
                return 'l.AtUriString';
            case 'did':
                return 'l.DidString';
            case 'handle':
                return 'l.HandleString';
            case 'at-identifier':
                return 'l.AtIdentifierString';
            case 'nsid':
                return 'l.NsidString';
            case 'tid':
                return 'l.TidString';
            case 'cid':
                return 'l.CidString';
            case 'language':
                return 'l.LanguageString';
            case 'record-key':
                return 'l.RecordKeyString';
            default:
                throw new Error(`Unknown string format: ${def.format}`);
        }
        if (def.knownValues?.length) {
            return (def.knownValues.map((v) => JSON.stringify(v)).join(' | ') +
                ' | l.UnknownString');
        }
        return 'string';
    }
    async compileBytesSchema(def) {
        const options = stringifyOptions(def, [
            'minLength',
            'maxLength',
        ]);
        return this.pure(`l.bytes(${options})`);
    }
    async compileBytesType(_def) {
        return 'Uint8Array';
    }
    async compileBlobSchema(def) {
        const options = stringifyOptions(def, [
            'maxSize',
            'accept',
        ]);
        return this.pure(`l.blob(${options})`);
    }
    async compileBlobType(_def) {
        return 'l.BlobRef';
    }
    async compileCidLinkSchema(_def) {
        return this.pure(`l.cid()`);
    }
    async compileCidLinkType(_def) {
        return 'l.Cid';
    }
    async compileRefSchema(def) {
        const { varName, typeName } = await this.refResolver.resolve(def.ref);
        // @NOTE "as any" is needed in schemas with circular refs as TypeScript
        // cannot infer the type of a value that depends on its initializer type
        return this.pure(`l.ref<${typeName}>((() => ${varName}) as any)`);
    }
    async compileRefType(def) {
        const ref = await this.refResolver.resolve(def.ref);
        return ref.typeName;
    }
    async compileRefUnionSchema(def) {
        if (def.refs.length === 0 && def.closed) {
            return this.pure(`l.never()`);
        }
        const refs = await Promise.all(def.refs.map(async (ref) => {
            const { varName, typeName } = await this.refResolver.resolve(ref);
            // @NOTE "as any" is needed in schemas with circular refs as TypeScript
            // cannot infer the type of a value that depends on its initializer type
            return this.pure(`l.typedRef<${typeName}>((() => ${varName}) as any)`);
        }));
        return this.pure(`l.typedUnion([${refs.join(',')}], ${def.closed ?? false})`);
    }
    async compileRefUnionType(def) {
        const types = await Promise.all(def.refs.map(async (ref) => {
            const { typeName } = await this.refResolver.resolve(ref);
            return `l.$Typed<${typeName}>`;
        }));
        if (!def.closed)
            types.push('l.Unknown$TypedObject');
        return types.join(' | ') || 'never';
    }
    async compileConstSchema(def) {
        if (hasEnum(def) && !def.enum.includes(def.const)) {
            return this.pure(`l.never()`);
        }
        const result = this.pure(`l.literal(${JSON.stringify(def.const)})`);
        return this.withDefault(result, def.default);
    }
    async compileConstType(def) {
        if (hasEnum(def) && !def.enum.includes(def.const)) {
            return 'never';
        }
        return JSON.stringify(def.const);
    }
    async compileEnumSchema(def) {
        if (def.enum.length === 0) {
            return this.pure(`l.never()`);
        }
        const result = def.enum.length === 1
            ? this.pure(`l.literal(${JSON.stringify(def.enum[0])})`)
            : this.pure(`l.enum(${JSON.stringify(def.enum)})`);
        return this.withDefault(result, def.default);
    }
    async compileEnumType(def) {
        return def.enum.map((v) => JSON.stringify(v)).join(' | ') || 'never';
    }
}
exports.LexDefBuilder = LexDefBuilder;
function parseDescription(description) {
    if (/deprecated/i.test(description)) {
        const deprecationMatch = description.match(/(\s*deprecated\s*(?:--?|:)?\s*([^-]*)(?:-+)?)/i);
        if (deprecationMatch) {
            const { 1: match, 2: deprecationNotice } = deprecationMatch;
            return {
                description: description.replace(match, '').trim() || undefined,
                tags: [{ tagName: 'deprecated', text: deprecationNotice?.trim() }],
            };
        }
        else {
            return {
                description: description.trim() || undefined,
                tags: [{ tagName: 'deprecated' }],
            };
        }
    }
    return {
        description: description.trim() || undefined,
    };
}
function compileLeadingTrivia(description) {
    if (!description)
        return undefined;
    const parsed = parseDescription(description);
    if (!parsed.description && !parsed.tags?.length)
        return undefined;
    const tags = parsed.tags
        ?.map(({ tagName, text }) => (text ? `@${tagName} ${text}` : `@${tagName}`))
        ?.join('\n');
    const text = `\n${[parsed.description, tags].filter(Boolean).join('\n\n')}`;
    return `\n\n/**${text.replaceAll('\n', '\n * ')}\n */\n`;
}
function compileDocs(description) {
    if (!description)
        return undefined;
    return [parseDescription(description)];
}
function stringifyOptions(obj, include, exclude) {
    const filtered = Object.entries(obj).filter(([k]) => (!include || include.includes(k)) && !exclude?.includes(k));
    return filtered.length ? JSON.stringify(Object.fromEntries(filtered)) : '';
}
function hasConst(def) {
    return def.const != null;
}
function hasEnum(def) {
    return def.enum != null;
}
function markPure(v) {
    return `/*#__PURE__*/ ${v}`;
}
//# sourceMappingURL=lex-def-builder.js.map