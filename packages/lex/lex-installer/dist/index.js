"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = install;
const tslib_1 = require("tslib");
const fs_js_1 = require("./fs.js");
const lex_installer_js_1 = require("./lex-installer.js");
const lexicons_manifest_js_1 = require("./lexicons-manifest.js");
/**
 * Installs lexicons from the network based on the provided options.
 *
 * This is the main entry point for programmatic lexicon installation.
 * It reads an existing manifest (if present), installs any new lexicons,
 * and optionally saves the updated manifest.
 *
 * @param options - Configuration options for the installation
 * @throws {Error} When the manifest file cannot be read (unless it doesn't exist)
 * @throws {Error} When in CI mode and the manifest is out of date
 *
 * @example
 * Install lexicons and save the manifest:
 * ```typescript
 * import { install } from '@atproto/lex-installer'
 *
 * await install({
 *   lexicons: './lexicons',
 *   manifest: './lexicons.manifest.json',
 *   add: ['app.bsky.feed.post', 'app.bsky.actor.profile'],
 *   save: true,
 * })
 * ```
 *
 * @example
 * Verify manifest in CI pipeline:
 * ```typescript
 * import { install } from '@atproto/lex-installer'
 *
 * // Throws if manifest is out of date
 * await install({
 *   lexicons: './lexicons',
 *   manifest: './lexicons.manifest.json',
 *   ci: true,
 * })
 * ```
 *
 * @example
 * Install from specific AT URIs:
 * ```typescript
 * import { install } from '@atproto/lex-installer'
 *
 * await install({
 *   lexicons: './lexicons',
 *   manifest: './lexicons.manifest.json',
 *   add: ['at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post'],
 *   save: true,
 * })
 * ```
 */
async function install(options) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const manifest = await (0, fs_js_1.readJsonFile)(options.manifest).then((json) => lexicons_manifest_js_1.lexiconsManifestSchema.parse(json), (cause) => {
            if ((0, fs_js_1.isEnoentError)(cause))
                return undefined;
            throw new Error('Failed to read lexicons manifest', { cause });
        });
        const additions = new Set(options.add);
        // Perform the installation using the existing manifest as "hint"
        const installer = tslib_1.__addDisposableResource(env_1, new lex_installer_js_1.LexInstaller(options), true);
        await installer.install({ additions, manifest });
        // Verify lockfile
        if (options.ci && (!manifest || !installer.equals(manifest))) {
            throw new Error('Lexicons manifest is out of date');
        }
        // Save changes if requested
        if (options.save) {
            await installer.save();
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
//# sourceMappingURL=index.js.map