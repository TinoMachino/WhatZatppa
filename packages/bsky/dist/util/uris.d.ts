import { DidString } from '@atproto/syntax';
import { StrongRef } from '../views/types.js';
/**
 * Convert a post URI to a threadgate URI. If the URI is not a valid
 * post URI, return URI unchanged. Threadgate lookups will then fail.
 */
export declare function postUriToThreadgateUri(postUri: string): import("@atproto/syntax").AtUriString;
/**
 * Convert a post URI to a postgate URI. If the URI is not a valid
 * post URI, return URI unchanged. Postgate lookups will then fail.
 */
export declare function postUriToPostgateUri(postUri: string): import("@atproto/syntax").AtUriString;
export declare function uriToDid(uri: string): DidString;
export declare function safePinnedPost(value: unknown): StrongRef | undefined;
//# sourceMappingURL=uris.d.ts.map