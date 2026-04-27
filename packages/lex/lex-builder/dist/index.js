"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const tslib_1 = require("tslib");
// Must be first
require("./polyfill.js");
const lex_builder_js_1 = require("./lex-builder.js");
tslib_1.__exportStar(require("./lex-builder.js"), exports);
tslib_1.__exportStar(require("./lex-def-builder.js"), exports);
tslib_1.__exportStar(require("./lexicon-directory-indexer.js"), exports);
/**
 * Builds TypeScript schemas from Lexicon documents.
 *
 * This is the main entry point for programmatic usage of the lex-builder
 * package. It creates a new {@link LexBuilder} instance, loads lexicon
 * documents from the specified directory, and saves the generated TypeScript
 * files to the output directory.
 *
 * @param options - Combined build options including source directory, output
 *   directory, and generation settings
 *
 * @example
 * ```ts
 * import { build } from '@atproto/lex-builder'
 *
 * await build({
 *   lexicons: './lexicons',
 *   out: './src/generated',
 *   pretty: true,
 *   clear: true,
 * })
 * ```
 */
async function build(options) {
    const builder = new lex_builder_js_1.LexBuilder(options);
    await builder.load(options);
    await builder.save(options);
}
//# sourceMappingURL=index.js.map