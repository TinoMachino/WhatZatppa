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
exports.ChatServiceProfile = void 0;
const plc = __importStar(require("@did-plc/lib"));
const crypto_1 = require("@atproto/crypto");
// Static dev-only key so the local chat service publishes a stable DID.
// This is a hex-encoded secp256k1 private key because Secp256k1Keypair.import()
// expects hex strings in this workspace.
const DEV_CHAT_PRIVATE_KEY = '4f1de6ce4c3e8b25d4b91b7e7a0f0ad83e6f1e4cb51f2fe4d7d1c8f85d36f2ae';
class ChatServiceProfile {
    constructor(did, key, publicUrl) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: key
        });
        Object.defineProperty(this, "publicUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: publicUrl
        });
    }
    static async create(opts) {
        const plcClient = new plc.Client(opts.plcUrl);
        const key = await crypto_1.Secp256k1Keypair.import(opts.privateKey ?? DEV_CHAT_PRIVATE_KEY);
        const handle = opts.handle ?? 'chat.test';
        const plcOp = await plc.signOperation({
            type: 'plc_operation',
            rotationKeys: [key.did()],
            alsoKnownAs: [`at://${handle}`],
            verificationMethods: {
                atproto: key.did(),
            },
            services: {
                bsky_chat: {
                    type: 'BskyChatService',
                    endpoint: opts.publicUrl,
                },
            },
            prev: null,
        }, key);
        const did = await plc.didForCreateOp(plcOp);
        try {
            await plcClient.getDocument(did);
        }
        catch {
            await plcClient.sendOperation(did, plcOp);
        }
        await plcClient.updateData(did, key, (doc) => {
            doc.alsoKnownAs = [`at://${handle}`];
            doc.verificationMethods = {
                ...(doc.verificationMethods ?? {}),
                atproto: key.did(),
            };
            doc.services = {
                ...(doc.services ?? {}),
                bsky_chat: {
                    type: 'BskyChatService',
                    endpoint: opts.publicUrl,
                },
            };
            return doc;
        });
        return new ChatServiceProfile(did, key, opts.publicUrl);
    }
}
exports.ChatServiceProfile = ChatServiceProfile;
//# sourceMappingURL=service-profile-chat.js.map