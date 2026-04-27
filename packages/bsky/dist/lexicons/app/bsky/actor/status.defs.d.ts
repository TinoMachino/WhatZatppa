import { l } from '@atproto/lex';
import * as EmbedExternal from '../embed/external.defs.js';
declare const $nsid = "app.bsky.actor.status";
export { $nsid };
/** A declaration of a Bluesky account status. */
type Main = {
    $type: 'app.bsky.actor.status';
    /**
     * The status for the account.
     */
    status: 'app.bsky.actor.status#live' | l.UnknownString;
    /**
     * An optional embed associated with the status.
     */
    embed?: l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
    /**
     * The duration of the status in minutes. Applications can choose to impose minimum and maximum limits.
     */
    durationMinutes?: number;
    createdAt: l.DatetimeString;
};
export type { Main };
/** A declaration of a Bluesky account status. */
declare const main: l.RecordSchema<"literal:self", "app.bsky.actor.status", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.actor.status", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        status: "app.bsky.actor.status#live" | l.UnknownString;
        embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
        durationMinutes?: number | undefined;
        $type: "app.bsky.actor.status";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        status: "app.bsky.actor.status#live" | l.UnknownString;
        embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
        durationMinutes?: number | undefined;
        $type: "app.bsky.actor.status";
    };
}, $type: "app.bsky.actor.status";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    status: "app.bsky.actor.status#live" | l.UnknownString;
    embed?: (l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject) | undefined;
    durationMinutes?: number | undefined;
    $type: "app.bsky.actor.status";
}>;
/** Advertises an account as currently offering live content. */
type Live = 'app.bsky.actor.status#live';
export type { Live };
/** Advertises an account as currently offering live content. */
declare const live: l.TokenSchema<"app.bsky.actor.status#live">;
export { live };
//# sourceMappingURL=status.defs.d.ts.map