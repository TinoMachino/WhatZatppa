import { l } from '@atproto/lex';
declare const $nsid = "com.germnetwork.declaration";
export { $nsid };
/** A declaration of a Germ Network account */
type Main = {
    $type: 'com.germnetwork.declaration';
    /**
     * Semver version number, without pre-release or build information, for the format of opaque content
     */
    version: string;
    /**
     * Opaque value, an ed25519 public key prefixed with a byte enum
     */
    currentKey: Uint8Array;
    /**
     * Controls who can message this account
     */
    messageMe?: MessageMe;
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
    keyPackage?: Uint8Array;
    /**
     * Array of opaque values to allow for key rolling
     */
    continuityProofs?: Uint8Array[];
};
export type { Main };
/** A declaration of a Germ Network account */
declare const main: l.RecordSchema<"literal:self", "com.germnetwork.declaration", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.germnetwork.declaration", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        version: string;
        currentKey: Uint8Array;
        messageMe?: MessageMe
        /**
         * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
         */
         | undefined;
        keyPackage?: Uint8Array
        /**
         * Array of opaque values to allow for key rolling
         */
         | undefined;
        continuityProofs?: Uint8Array[] | undefined;
        $type: "com.germnetwork.declaration";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        version: string;
        currentKey: Uint8Array;
        messageMe?: MessageMe
        /**
         * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
         */
         | undefined;
        keyPackage?: Uint8Array
        /**
         * Array of opaque values to allow for key rolling
         */
         | undefined;
        continuityProofs?: Uint8Array[] | undefined;
        $type: "com.germnetwork.declaration";
    };
}, $type: "com.germnetwork.declaration";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    version: string;
    currentKey: Uint8Array;
    messageMe?: MessageMe
    /**
     * Opaque value, contains MLS KeyPackage(s), and other signature data, and is signed by the currentKey
     */
     | undefined;
    keyPackage?: Uint8Array
    /**
     * Array of opaque values to allow for key rolling
     */
     | undefined;
    continuityProofs?: Uint8Array[] | undefined;
    $type: "com.germnetwork.declaration";
}>;
type MessageMe = {
    $type?: 'com.germnetwork.declaration#messageMe';
    /**
     * A URL to present to an account that does not have its own com.germnetwork.declaration record, must have an empty fragment component, where the app should fill in the fragment component with the DIDs of the two accounts who wish to message each other
     */
    messageMeUrl: l.UriString;
    /**
     * The policy of who can message the account, this value is included in the keyPackage, but is duplicated here to allow applications to decide if they should show a 'Message on Germ' button to the viewer.
     */
    showButtonTo: 'none' | 'usersIFollow' | 'everyone' | l.UnknownString;
};
export type { MessageMe };
declare const messageMe: l.TypedObjectSchema<"com.germnetwork.declaration#messageMe", l.Validator<MessageMe, MessageMe>>;
export { messageMe };
//# sourceMappingURL=declaration.defs.d.ts.map