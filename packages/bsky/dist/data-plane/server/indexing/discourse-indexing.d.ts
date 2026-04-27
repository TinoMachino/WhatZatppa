import { AtUri } from '@atproto/syntax';
import { DatabaseSchema } from '../db/database-schema';
export declare function indexPostDiscourse(db: DatabaseSchema, uri: AtUri, text: string, timestamp: string, community?: string | null): Promise<void>;
export declare function updatePostDiscourseCommunity(db: DatabaseSchema, postUri: string, community: string): Promise<void>;
export declare function deletePostDiscourse(db: DatabaseSchema, uri: AtUri): Promise<void>;
//# sourceMappingURL=discourse-indexing.d.ts.map