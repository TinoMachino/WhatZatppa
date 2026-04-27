"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComAtprotoSyncNS = exports.ComAtprotoNS = exports.ComNS = exports.AtpBaseClient = exports.ComAtprotoSyncGetRecord = void 0;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_js_1 = require("./lexicons.js");
const ComAtprotoSyncGetRecord = __importStar(require("./types/com/atproto/sync/getRecord.js"));
exports.ComAtprotoSyncGetRecord = __importStar(require("./types/com/atproto/sync/getRecord.js"));
class AtpBaseClient extends xrpc_1.XrpcClient {
    constructor(options) {
        super(options, lexicons_js_1.schemas);
        Object.defineProperty(this, "com", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.com = new ComNS(this);
    }
    /** @deprecated use `this` instead */
    get xrpc() {
        return this;
    }
}
exports.AtpBaseClient = AtpBaseClient;
class ComNS {
    constructor(client) {
        Object.defineProperty(this, "_client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "atproto", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._client = client;
        this.atproto = new ComAtprotoNS(client);
    }
}
exports.ComNS = ComNS;
class ComAtprotoNS {
    constructor(client) {
        Object.defineProperty(this, "_client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sync", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._client = client;
        this.sync = new ComAtprotoSyncNS(client);
    }
}
exports.ComAtprotoNS = ComAtprotoNS;
class ComAtprotoSyncNS {
    constructor(client) {
        Object.defineProperty(this, "_client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._client = client;
    }
    getRecord(params, opts) {
        return this._client
            .call('com.atproto.sync.getRecord', params, undefined, opts)
            .catch((e) => {
            throw ComAtprotoSyncGetRecord.toKnownErr(e);
        });
    }
}
exports.ComAtprotoSyncNS = ComAtprotoSyncNS;
//# sourceMappingURL=index.js.map