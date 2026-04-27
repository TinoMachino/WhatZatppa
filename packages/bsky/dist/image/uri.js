"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.BadPathError = exports.ImageUriBuilder = void 0;
const lex_1 = require("@atproto/lex");
const PATH_REGEX = /^\/(.+?)\/plain\/(.+?)\/(.+?)(?:@(.+?))?$/;
class ImageUriBuilder {
    constructor(endpoint) {
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!(0, lex_1.isUriString)(endpoint)) {
            throw new Error('ImageUriBuilder endpoint must be a valid UriString');
        }
        this.endpoint = endpoint;
    }
    getPresetUri(id, did, cid) {
        const options = exports.presets[id];
        if (!options) {
            throw new Error(`Unrecognized requested common uri type: ${id}`);
        }
        const path = ImageUriBuilder.getPath({
            preset: id,
            did,
            cid,
        });
        return `${this.endpoint}${path}`;
    }
    static getPath(opts) {
        return `/${opts.preset}/plain/${opts.did}/${opts.cid}`;
    }
    static getOptions(path) {
        const match = path.match(PATH_REGEX);
        if (!match) {
            throw new BadPathError('Invalid path');
        }
        const [, presetUnsafe, did, cid, formatUnsafe] = match;
        if (!ImageUriBuilder.presets.includes(presetUnsafe)) {
            throw new BadPathError('Invalid path: bad preset');
        }
        if (formatUnsafe !== undefined &&
            formatUnsafe !== 'jpeg' &&
            formatUnsafe !== 'webp') {
            throw new BadPathError('Invalid path: bad format');
        }
        const preset = presetUnsafe;
        const format = formatUnsafe;
        return {
            ...exports.presets[preset],
            format: format ?? exports.presets[preset].format,
            did,
            cid,
            preset,
        };
    }
}
exports.ImageUriBuilder = ImageUriBuilder;
Object.defineProperty(ImageUriBuilder, "presets", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [
        'avatar',
        'banner',
        'feed_thumbnail',
        'feed_fullsize',
    ]
});
class BadPathError extends Error {
}
exports.BadPathError = BadPathError;
// @NOTE these prefix settings don't get used anywhere in this package,
// but they serve as soft documentation of the behavior in production.
exports.presets = {
    avatar: {
        format: 'webp',
        fit: 'cover',
        height: 1000,
        width: 1000,
        min: true,
    },
    banner: {
        format: 'webp',
        fit: 'cover',
        height: 1000,
        width: 3000,
        min: true,
    },
    feed_thumbnail: {
        format: 'webp',
        fit: 'inside',
        height: 2000,
        width: 2000,
        min: true,
    },
    feed_fullsize: {
        format: 'webp',
        fit: 'inside',
        height: 1000,
        width: 1000,
        min: true,
    },
};
//# sourceMappingURL=uri.js.map