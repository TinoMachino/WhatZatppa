import { SourceFile } from 'ts-morph';
import { LexiconDocument, LexiconIndexer, LexiconProcedure, LexiconQuery, LexiconSubscription } from '@atproto/lex-document';
import { RefResolverOptions, ResolvedRef } from './ref-resolver.js';
/**
 * Configuration options for the {@link LexDefBuilder} class.
 *
 * @see {@link RefResolverOptions} for reference resolution options
 */
export type LexDefBuilderOptions = RefResolverOptions & {
    /**
     * The module specifier to use for importing the lexicon schema library.
     *
     * @default '@atproto/lex-schema'
     */
    lib?: string;
    /**
     * Whether to add `#__PURE__` annotations to function calls.
     *
     * These annotations help bundlers with tree-shaking by marking
     * side-effect-free function calls.
     *
     * @default false
     */
    pureAnnotations?: boolean;
};
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
export declare class LexDefBuilder {
    private readonly options;
    private readonly file;
    private readonly doc;
    private readonly refResolver;
    constructor(options: LexDefBuilderOptions, file: SourceFile, doc: LexiconDocument, indexer: LexiconIndexer);
    private pure;
    build(): Promise<void>;
    private addUtils;
    private addDef;
    private addPermissionSet;
    private addProcedure;
    private addQuery;
    private addSubscription;
    addMethodTypeUtils(ref: ResolvedRef, def: LexiconProcedure | LexiconQuery | LexiconSubscription): void;
    private addRecord;
    private addObject;
    private addToken;
    private addArray;
    private addSchema;
    private compilePayload;
    private compileBodySchema;
    private compileParamsSchema;
    private compileErrors;
    private compileObjectSchema;
    private compilePropertiesSchemas;
    private compilePropertiesTypes;
    private compilePropertyEntrySchema;
    private compilePropertyEntryType;
    private compileContainedSchema;
    private compileContainedType;
    private compileArraySchema;
    private compileArrayType;
    private compileUnknownSchema;
    private compileUnknownType;
    private withDefault;
    private compileBooleanSchema;
    private compileBooleanType;
    private compileIntegerSchema;
    private compileIntegerType;
    private compileStringSchema;
    private compileStringType;
    private compileBytesSchema;
    private compileBytesType;
    private compileBlobSchema;
    private compileBlobType;
    private compileCidLinkSchema;
    private compileCidLinkType;
    private compileRefSchema;
    private compileRefType;
    private compileRefUnionSchema;
    private compileRefUnionType;
    private compileConstSchema;
    private compileConstType;
    private compileEnumSchema;
    private compileEnumType;
}
//# sourceMappingURL=lex-def-builder.d.ts.map