"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tap = void 0;
const common_1 = require("@atproto/common");
const channel_1 = require("./channel");
const types_1 = require("./types");
const util_1 = require("./util");
class Tap {
    constructor(url, config = {}) {
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "adminPassword", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authHeader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "addReposUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "removeReposUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            throw new Error('Invalid URL, expected http:// or https://');
        }
        this.url = url;
        this.adminPassword = config.adminPassword;
        if (this.adminPassword) {
            this.authHeader = (0, util_1.formatAdminAuthHeader)(this.adminPassword);
        }
        this.addReposUrl = new URL('/repos/add', this.url);
        this.removeReposUrl = new URL('/repos/remove', this.url);
    }
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.authHeader) {
            headers['Authorization'] = this.authHeader;
        }
        return headers;
    }
    channel(handler, opts) {
        const url = new URL(this.url);
        url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
        url.pathname = '/channel';
        return new channel_1.TapChannel(url.toString(), handler, {
            adminPassword: this.adminPassword,
            ...opts,
        });
    }
    async addRepos(dids) {
        const response = await fetch(this.addReposUrl, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ dids }),
        });
        await response.body?.cancel(); // expect empty body
        if (!response.ok) {
            throw new Error(`Failed to add repos: ${response.statusText}`);
        }
    }
    async removeRepos(dids) {
        const response = await fetch(this.removeReposUrl, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ dids }),
        });
        await response.body?.cancel(); // expect empty body
        if (!response.ok) {
            throw new Error(`Failed to remove repos: ${response.statusText}`);
        }
    }
    async resolveDid(did) {
        const response = await fetch(new URL(`/resolve/${did}`, this.url), {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (response.status === 404) {
            return null;
        }
        else if (!response.ok) {
            await response.body?.cancel();
            throw new Error(`Failed to resolve DID: ${response.statusText}`);
        }
        return common_1.didDocument.parse(await response.json());
    }
    async getRepoInfo(did) {
        const response = await fetch(new URL(`/info/${did}`, this.url), {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            await response.body?.cancel();
            throw new Error(`Failed to get repo info: ${response.statusText}`);
        }
        return types_1.repoInfoSchema.parse(await response.json());
    }
}
exports.Tap = Tap;
//# sourceMappingURL=client.js.map