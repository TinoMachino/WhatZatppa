"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexBuilder = void 0;
const tslib_1 = require("tslib");
const node_assert_1 = tslib_1.__importDefault(require("node:assert"));
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const ts_morph_1 = require("ts-morph");
const filter_js_1 = require("./filter.js");
const filtered_indexer_js_1 = require("./filtered-indexer.js");
const formatter_js_1 = require("./formatter.js");
const lex_def_builder_js_1 = require("./lex-def-builder.js");
const lexicon_directory_indexer_js_1 = require("./lexicon-directory-indexer.js");
const ts_lang_js_1 = require("./ts-lang.js");
/**
 * Main builder class for generating TypeScript schemas from Lexicon documents.
 *
 * The LexBuilder orchestrates the entire code generation process:
 * 1. Loading and indexing lexicon documents from the filesystem
 * 2. Generating TypeScript type definitions and runtime schemas
 * 3. Creating namespace export trees for convenient imports
 * 4. Saving formatted output files
 *
 * @example
 * ```ts
 * const builder = new LexBuilder({ indexFile: true, pretty: true })
 *
 * // Load lexicons from a directory
 * await builder.load({ lexicons: './lexicons' })
 *
 * // Save generated TypeScript to output directory
 * await builder.save({ out: './src/generated', clear: true })
 * ```
 */
class LexBuilder {
    options;
    #imported = new Set();
    #project = new ts_morph_1.Project({
        useInMemoryFileSystem: true,
        manipulationSettings: { indentationText: ts_morph_1.IndentationText.TwoSpaces },
    });
    constructor(options = {}) {
        this.options = options;
    }
    get fileExt() {
        return this.options.fileExt ?? '.ts';
    }
    get importExt() {
        return this.options.importExt ?? '.js';
    }
    async load(options) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const indexer = tslib_1.__addDisposableResource(env_1, new filtered_indexer_js_1.FilteredIndexer(new lexicon_directory_indexer_js_1.LexiconDirectoryIndexer(options), (0, filter_js_1.buildFilter)(options)), true);
            for await (const doc of indexer) {
                if (!this.#imported.has(doc.id)) {
                    this.#imported.add(doc.id);
                }
                else {
                    throw new Error(`Duplicate lexicon document id: ${doc.id}`);
                }
                await this.createDefsFile(doc, indexer);
                await this.createExportTree(doc);
            }
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            const result_1 = tslib_1.__disposeResources(env_1);
            if (result_1)
                await result_1;
        }
    }
    async save(options) {
        const files = this.#project.getSourceFiles();
        const destination = (0, node_path_1.resolve)(options.out);
        if (options.clear) {
            await (0, promises_1.rm)(destination, { recursive: true, force: true });
        }
        else if (!options.override) {
            await Promise.all(files.map(async (f) => assertNotFileExists((0, node_path_1.join)(destination, f.getFilePath()))));
        }
        const formatter = new formatter_js_1.Formatter(options);
        await Promise.all(Array.from(files, async (file) => {
            const filePath = (0, node_path_1.join)(destination, file.getFilePath());
            const content = await formatter.format(file.getFullText());
            await (0, promises_1.mkdir)((0, node_path_1.join)(filePath, '..'), { recursive: true });
            await (0, promises_1.rm)(filePath, { recursive: true, force: true });
            await (0, promises_1.writeFile)(filePath, content, 'utf8');
        }));
    }
    createFile(path) {
        return this.#project.createSourceFile(path);
    }
    getFile(path) {
        return this.#project.getSourceFile(path) || this.createFile(path);
    }
    async createExportTree(doc) {
        const namespaces = doc.id.split('.');
        if (this.options.indexFile) {
            const indexFile = this.getFile(`/index${this.fileExt}`);
            const tldNs = namespaces[0];
            (0, node_assert_1.default)(tldNs !== 'index', 'The "indexFile" options cannot be used with namespaces using a ".index" tld.');
            const tldNsSpecifier = `./${tldNs}${this.importExt}`;
            if (!indexFile.getExportDeclaration(tldNsSpecifier)) {
                indexFile.addExportDeclaration({
                    moduleSpecifier: tldNsSpecifier,
                    namespaceExport: (0, ts_lang_js_1.asNamespaceExport)(tldNs),
                });
            }
        }
        // First create the parent namespaces
        for (let i = 0; i < namespaces.length - 1; i++) {
            const currentNs = namespaces[i];
            const childNs = namespaces[i + 1];
            const path = (0, node_path_1.join)('/', ...namespaces.slice(0, i + 1));
            const file = this.getFile(`${path}${this.fileExt}`);
            const childModuleSpecifier = `./${currentNs}/${childNs}${this.importExt}`;
            const dec = file.getExportDeclaration(childModuleSpecifier);
            if (!dec) {
                file.addExportDeclaration({
                    moduleSpecifier: childModuleSpecifier,
                    namespaceExport: (0, ts_lang_js_1.asNamespaceExport)(childNs),
                });
            }
        }
        // The child file exports the schemas (as *)
        const path = (0, node_path_1.join)('/', ...namespaces);
        const file = this.getFile(`${path}${this.fileExt}`);
        file.addExportDeclaration({
            moduleSpecifier: `./${namespaces.at(-1)}.defs${this.importExt}`,
        });
        // @NOTE Individual exports exports from the defs file might conflict with
        // child namespaces. For this reason, we also add a namespace export for the
        // defs (export * as $defs from './xyz.defs'). This is an escape hatch
        // allowing to still access the definitions if a hash get shadowed by a
        // child namespace.
        file.addExportDeclaration({
            moduleSpecifier: `./${namespaces.at(-1)}.defs${this.importExt}`,
            namespaceExport: '$defs',
        });
    }
    async createDefsFile(doc, indexer) {
        const path = (0, node_path_1.join)('/', ...doc.id.split('.'));
        const file = this.createFile(`${path}.defs${this.fileExt}`);
        const fileBuilder = new lex_def_builder_js_1.LexDefBuilder(this.options, file, doc, indexer);
        await fileBuilder.build();
    }
}
exports.LexBuilder = LexBuilder;
async function assertNotFileExists(file) {
    try {
        await (0, promises_1.stat)(file);
        throw new Error(`File already exists: ${file}`);
    }
    catch (err) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT')
            return;
        throw err;
    }
}
//# sourceMappingURL=lex-builder.js.map