"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleManifest = bundleManifest;
const node_crypto_1 = require("node:crypto");
const node_path_1 = require("node:path");
const mime_1 = __importDefault(require("mime"));
function bundleManifest({ name = 'bundle-manifest.json', data = false, } = {}) {
    return {
        name: 'bundle-manifest',
        generateBundle(outputOptions, bundle) {
            const manifest = {};
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type === 'asset') {
                    manifest[fileName] = {
                        type: chunk.type,
                        data: data
                            ? Buffer.from(chunk.source).toString('base64')
                            : undefined,
                        mime: mime_1.default.getType((0, node_path_1.extname)(fileName)) || undefined,
                        sha256: (0, node_crypto_1.createHash)('sha256').update(chunk.source).digest('base64'),
                    };
                }
                if (chunk.type === 'chunk') {
                    manifest[fileName] = {
                        type: chunk.type,
                        data: data ? Buffer.from(chunk.code).toString('base64') : undefined,
                        mime: 'application/javascript',
                        sha256: (0, node_crypto_1.createHash)('sha256').update(chunk.code).digest('base64'),
                        dynamicImports: chunk.dynamicImports,
                        isDynamicEntry: chunk.isDynamicEntry,
                        isEntry: chunk.isEntry,
                        isImplicitEntry: chunk.isImplicitEntry,
                        name: chunk.name,
                    };
                }
            }
            this.emitFile({
                type: 'asset',
                fileName: name,
                source: JSON.stringify(manifest, null, 2),
            });
        },
    };
}
//# sourceMappingURL=index.js.map