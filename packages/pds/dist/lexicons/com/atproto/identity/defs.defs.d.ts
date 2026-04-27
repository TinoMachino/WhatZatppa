import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.defs";
export { $nsid };
type IdentityInfo = {
    $type?: 'com.atproto.identity.defs#identityInfo';
    did: l.DidString;
    /**
     * The validated handle of the account; or 'handle.invalid' if the handle did not bi-directionally match the DID document.
     */
    handle: l.HandleString;
    /**
     * The complete DID document for the identity.
     */
    didDoc: l.LexMap;
};
export type { IdentityInfo };
declare const identityInfo: l.TypedObjectSchema<"com.atproto.identity.defs#identityInfo", l.Validator<IdentityInfo, IdentityInfo>>;
export { identityInfo };
//# sourceMappingURL=defs.defs.d.ts.map