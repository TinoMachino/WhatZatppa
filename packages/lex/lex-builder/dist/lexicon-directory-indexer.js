"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexiconDirectoryIndexer = void 0;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const lex_document_1 = require("@atproto/lex-document");
/**
 * Indexes lexicon documents from a filesystem directory.
 *
 * This class recursively scans a directory for JSON files, parses them as
 * lexicon documents, and provides an iterable interface for processing them.
 * It extends {@link LexiconIterableIndexer} to support both iteration and
 * lookup by NSID.
 */
class LexiconDirectoryIndexer extends lex_document_1.LexiconIterableIndexer {
    constructor(options) {
        super(readLexicons(options));
    }
}
exports.LexiconDirectoryIndexer = LexiconDirectoryIndexer;
async function* readLexicons(options) {
    for await (const filePath of listFiles(options.lexicons)) {
        if (filePath.endsWith('.json')) {
            try {
                const data = await (0, promises_1.readFile)(filePath, 'utf8');
                yield lex_document_1.lexiconDocumentSchema.parse(JSON.parse(data));
            }
            catch (cause) {
                const message = `Error parsing lexicon document ${filePath}`;
                if (options.ignoreInvalidLexicons)
                    console.error(`${message}:`, cause);
                else
                    throw new Error(message, { cause });
            }
        }
    }
}
async function* listFiles(dir) {
    const dirents = await (0, promises_1.readdir)(dir, { withFileTypes: true }).catch((err) => {
        if (err?.code === 'ENOENT')
            return [];
        throw err;
    });
    for (const dirent of dirents) {
        const res = (0, node_path_1.join)(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* listFiles(res);
        }
        else if (dirent.isFile() || dirent.isSymbolicLink()) {
            yield res;
        }
    }
}
//# sourceMappingURL=lexicon-directory-indexer.js.map