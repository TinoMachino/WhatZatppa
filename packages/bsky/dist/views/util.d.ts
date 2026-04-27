import { AtUriString, DidString, UriString } from '@atproto/lex';
import { GateRecord, PostRecord, PostgateRecord } from './types.js';
export declare const parseThreadGate: (replierDid: string, ownerDid: string, rootPost: PostRecord | null, gate: GateRecord | null) => ParsedThreadGate;
type ParsedThreadGate = {
    canReply?: boolean;
    allowMentions?: boolean;
    allowFollower?: boolean;
    allowFollowing?: boolean;
    allowListUris?: AtUriString[];
};
export declare const parsePostgate: ({ gate, viewerDid, authorDid, }: {
    gate: PostgateRecord | undefined;
    viewerDid: string | undefined;
    authorDid: string;
}) => ParsedPostgate;
type ParsedPostgate = {
    embeddingRules: {
        canEmbed: boolean;
    };
};
export declare class VideoUriBuilder {
    private opts;
    constructor(opts: {
        playlistUrlPattern: string;
        thumbnailUrlPattern: string;
    });
    playlist({ did, cid }: {
        did: DidString;
        cid: string;
    }): UriString;
    thumbnail({ did, cid }: {
        did: DidString;
        cid: string;
    }): UriString;
}
export {};
//# sourceMappingURL=util.d.ts.map