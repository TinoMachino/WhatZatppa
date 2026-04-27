import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.ageassurance.defs";
export { $nsid };
/** The access level granted based on Age Assurance data we've processed. */
type Access = 'unknown' | 'none' | 'safe' | 'full' | l.UnknownString;
export type { Access };
/** The access level granted based on Age Assurance data we've processed. */
declare const access: l.StringSchema<{
    knownValues: ["unknown", "none", "safe", "full"];
}>;
export { access };
/** The status of the Age Assurance process. */
type Status = 'unknown' | 'pending' | 'assured' | 'blocked' | l.UnknownString;
export type { Status };
/** The status of the Age Assurance process. */
declare const status: l.StringSchema<{
    knownValues: ["unknown", "pending", "assured", "blocked"];
}>;
export { status };
/** The user's computed Age Assurance state. */
type State = {
    $type?: 'app.bsky.ageassurance.defs#state';
    /**
     * The timestamp when this state was last updated.
     */
    lastInitiatedAt?: l.DatetimeString;
    status: Status;
    access: Access;
};
export type { State };
/** The user's computed Age Assurance state. */
declare const state: l.TypedObjectSchema<"app.bsky.ageassurance.defs#state", l.Validator<State, State>>;
export { state };
/** Additional metadata needed to compute Age Assurance state client-side. */
type StateMetadata = {
    $type?: 'app.bsky.ageassurance.defs#stateMetadata';
    /**
     * The account creation timestamp.
     */
    accountCreatedAt?: l.DatetimeString;
};
export type { StateMetadata };
/** Additional metadata needed to compute Age Assurance state client-side. */
declare const stateMetadata: l.TypedObjectSchema<"app.bsky.ageassurance.defs#stateMetadata", l.Validator<StateMetadata, StateMetadata>>;
export { stateMetadata };
type Config = {
    $type?: 'app.bsky.ageassurance.defs#config';
    /**
     * The per-region Age Assurance configuration.
     */
    regions: ConfigRegion[];
};
export type { Config };
declare const config: l.TypedObjectSchema<"app.bsky.ageassurance.defs#config", l.Validator<Config, Config>>;
export { config };
/** The Age Assurance configuration for a specific region. */
type ConfigRegion = {
    $type?: 'app.bsky.ageassurance.defs#configRegion';
    /**
     * The ISO 3166-1 alpha-2 country code this configuration applies to.
     */
    countryCode: string;
    /**
     * The ISO 3166-2 region code this configuration applies to. If omitted, the configuration applies to the entire country.
     */
    regionCode?: string;
    /**
     * The minimum age (as a whole integer) required to use Bluesky in this region.
     */
    minAccessAge: number;
    /**
     * The ordered list of Age Assurance rules that apply to this region. Rules should be applied in order, and the first matching rule determines the access level granted. The rules array should always include a default rule as the last item.
     */
    rules: (l.$Typed<ConfigRegionRuleDefault> | l.$Typed<ConfigRegionRuleIfDeclaredOverAge> | l.$Typed<ConfigRegionRuleIfDeclaredUnderAge> | l.$Typed<ConfigRegionRuleIfAssuredOverAge> | l.$Typed<ConfigRegionRuleIfAssuredUnderAge> | l.$Typed<ConfigRegionRuleIfAccountNewerThan> | l.$Typed<ConfigRegionRuleIfAccountOlderThan> | l.Unknown$TypedObject)[];
};
export type { ConfigRegion };
/** The Age Assurance configuration for a specific region. */
declare const configRegion: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegion", l.Validator<ConfigRegion, ConfigRegion>>;
export { configRegion };
/** Age Assurance rule that applies by default. */
type ConfigRegionRuleDefault = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleDefault';
    access: Access;
};
export type { ConfigRegionRuleDefault };
/** Age Assurance rule that applies by default. */
declare const configRegionRuleDefault: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleDefault", l.Validator<ConfigRegionRuleDefault, ConfigRegionRuleDefault>>;
export { configRegionRuleDefault };
/** Age Assurance rule that applies if the user has declared themselves equal-to or over a certain age. */
type ConfigRegionRuleIfDeclaredOverAge = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfDeclaredOverAge';
    /**
     * The age threshold as a whole integer.
     */
    age: number;
    access: Access;
};
export type { ConfigRegionRuleIfDeclaredOverAge };
/** Age Assurance rule that applies if the user has declared themselves equal-to or over a certain age. */
declare const configRegionRuleIfDeclaredOverAge: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfDeclaredOverAge", l.Validator<ConfigRegionRuleIfDeclaredOverAge, ConfigRegionRuleIfDeclaredOverAge>>;
export { configRegionRuleIfDeclaredOverAge };
/** Age Assurance rule that applies if the user has declared themselves under a certain age. */
type ConfigRegionRuleIfDeclaredUnderAge = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfDeclaredUnderAge';
    /**
     * The age threshold as a whole integer.
     */
    age: number;
    access: Access;
};
export type { ConfigRegionRuleIfDeclaredUnderAge };
/** Age Assurance rule that applies if the user has declared themselves under a certain age. */
declare const configRegionRuleIfDeclaredUnderAge: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfDeclaredUnderAge", l.Validator<ConfigRegionRuleIfDeclaredUnderAge, ConfigRegionRuleIfDeclaredUnderAge>>;
export { configRegionRuleIfDeclaredUnderAge };
/** Age Assurance rule that applies if the user has been assured to be equal-to or over a certain age. */
type ConfigRegionRuleIfAssuredOverAge = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfAssuredOverAge';
    /**
     * The age threshold as a whole integer.
     */
    age: number;
    access: Access;
};
export type { ConfigRegionRuleIfAssuredOverAge };
/** Age Assurance rule that applies if the user has been assured to be equal-to or over a certain age. */
declare const configRegionRuleIfAssuredOverAge: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfAssuredOverAge", l.Validator<ConfigRegionRuleIfAssuredOverAge, ConfigRegionRuleIfAssuredOverAge>>;
export { configRegionRuleIfAssuredOverAge };
/** Age Assurance rule that applies if the user has been assured to be under a certain age. */
type ConfigRegionRuleIfAssuredUnderAge = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfAssuredUnderAge';
    /**
     * The age threshold as a whole integer.
     */
    age: number;
    access: Access;
};
export type { ConfigRegionRuleIfAssuredUnderAge };
/** Age Assurance rule that applies if the user has been assured to be under a certain age. */
declare const configRegionRuleIfAssuredUnderAge: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfAssuredUnderAge", l.Validator<ConfigRegionRuleIfAssuredUnderAge, ConfigRegionRuleIfAssuredUnderAge>>;
export { configRegionRuleIfAssuredUnderAge };
/** Age Assurance rule that applies if the account is equal-to or newer than a certain date. */
type ConfigRegionRuleIfAccountNewerThan = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfAccountNewerThan';
    /**
     * The date threshold as a datetime string.
     */
    date: l.DatetimeString;
    access: Access;
};
export type { ConfigRegionRuleIfAccountNewerThan };
/** Age Assurance rule that applies if the account is equal-to or newer than a certain date. */
declare const configRegionRuleIfAccountNewerThan: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfAccountNewerThan", l.Validator<ConfigRegionRuleIfAccountNewerThan, ConfigRegionRuleIfAccountNewerThan>>;
export { configRegionRuleIfAccountNewerThan };
/** Age Assurance rule that applies if the account is older than a certain date. */
type ConfigRegionRuleIfAccountOlderThan = {
    $type?: 'app.bsky.ageassurance.defs#configRegionRuleIfAccountOlderThan';
    /**
     * The date threshold as a datetime string.
     */
    date: l.DatetimeString;
    access: Access;
};
export type { ConfigRegionRuleIfAccountOlderThan };
/** Age Assurance rule that applies if the account is older than a certain date. */
declare const configRegionRuleIfAccountOlderThan: l.TypedObjectSchema<"app.bsky.ageassurance.defs#configRegionRuleIfAccountOlderThan", l.Validator<ConfigRegionRuleIfAccountOlderThan, ConfigRegionRuleIfAccountOlderThan>>;
export { configRegionRuleIfAccountOlderThan };
/** Object used to store Age Assurance data in stash. */
type Event = {
    $type?: 'app.bsky.ageassurance.defs#event';
    /**
     * The date and time of this write operation.
     */
    createdAt: l.DatetimeString;
    /**
     * The unique identifier for this instance of the Age Assurance flow, in UUID format.
     */
    attemptId: string;
    /**
     * The status of the Age Assurance process.
     */
    status: 'unknown' | 'pending' | 'assured' | 'blocked' | l.UnknownString;
    /**
     * The access level granted based on Age Assurance data we've processed.
     */
    access: 'unknown' | 'none' | 'safe' | 'full' | l.UnknownString;
    /**
     * The ISO 3166-1 alpha-2 country code provided when beginning the Age Assurance flow.
     */
    countryCode: string;
    /**
     * The ISO 3166-2 region code provided when beginning the Age Assurance flow.
     */
    regionCode?: string;
    /**
     * The email used for Age Assurance.
     */
    email?: string;
    /**
     * The IP address used when initiating the Age Assurance flow.
     */
    initIp?: string;
    /**
     * The user agent used when initiating the Age Assurance flow.
     */
    initUa?: string;
    /**
     * The IP address used when completing the Age Assurance flow.
     */
    completeIp?: string;
    /**
     * The user agent used when completing the Age Assurance flow.
     */
    completeUa?: string;
};
export type { Event };
/** Object used to store Age Assurance data in stash. */
declare const event: l.TypedObjectSchema<"app.bsky.ageassurance.defs#event", l.Validator<Event, Event>>;
export { event };
//# sourceMappingURL=defs.defs.d.ts.map