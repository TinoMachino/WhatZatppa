import { Secp256k1Keypair } from '@atproto/crypto';
export declare class ChatServiceProfile {
    readonly did: string;
    readonly key: Secp256k1Keypair;
    readonly publicUrl: string;
    constructor(did: string, key: Secp256k1Keypair, publicUrl: string);
    static create(opts: {
        plcUrl: string;
        publicUrl: string;
        handle?: string;
        privateKey?: string;
    }): Promise<ChatServiceProfile>;
}
//# sourceMappingURL=service-profile-chat.d.ts.map