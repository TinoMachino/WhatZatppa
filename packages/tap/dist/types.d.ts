import { LexMap, LexValue, l } from '@atproto/lex';
import { DidString, HandleString, NsidString } from '@atproto/syntax';
export declare const recordEventDataSchema: l.ObjectSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly rev: l.StringSchema<{}>;
    readonly collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    readonly rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
    readonly action: l.EnumSchema<"create" | "update" | "delete">;
    readonly record: l.OptionalSchema<l.LexMapSchema>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    readonly live: l.BooleanSchema;
}>;
export declare const identityEventDataSchema: l.ObjectSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    readonly is_active: l.BooleanSchema;
    readonly status: l.EnumSchema<"active" | "takendown" | "suspended" | "deactivated" | "deleted">;
}>;
export declare const recordEventSchema: l.ObjectSchema<{
    readonly id: l.IntegerSchema;
    readonly type: l.LiteralSchema<"record">;
    readonly record: l.ObjectSchema<{
        readonly did: l.StringSchema<{
            readonly format: "did";
        }>;
        readonly rev: l.StringSchema<{}>;
        readonly collection: l.StringSchema<{
            readonly format: "nsid";
        }>;
        readonly rkey: l.StringSchema<{
            readonly format: "record-key";
        }>;
        readonly action: l.EnumSchema<"create" | "update" | "delete">;
        readonly record: l.OptionalSchema<l.LexMapSchema>;
        readonly cid: l.OptionalSchema<l.StringSchema<{
            readonly format: "cid";
        }>>;
        readonly live: l.BooleanSchema;
    }>;
}>;
export declare const identityEventSchema: l.ObjectSchema<{
    readonly id: l.IntegerSchema;
    readonly type: l.LiteralSchema<"identity">;
    readonly identity: l.ObjectSchema<{
        readonly did: l.StringSchema<{
            readonly format: "did";
        }>;
        readonly handle: l.StringSchema<{
            readonly format: "handle";
        }>;
        readonly is_active: l.BooleanSchema;
        readonly status: l.EnumSchema<"active" | "takendown" | "suspended" | "deactivated" | "deleted">;
    }>;
}>;
export declare const tapEventSchema: l.DiscriminatedUnionSchema<"type", readonly [l.ObjectSchema<{
    readonly id: l.IntegerSchema;
    readonly type: l.LiteralSchema<"record">;
    readonly record: l.ObjectSchema<{
        readonly did: l.StringSchema<{
            readonly format: "did";
        }>;
        readonly rev: l.StringSchema<{}>;
        readonly collection: l.StringSchema<{
            readonly format: "nsid";
        }>;
        readonly rkey: l.StringSchema<{
            readonly format: "record-key";
        }>;
        readonly action: l.EnumSchema<"create" | "update" | "delete">;
        readonly record: l.OptionalSchema<l.LexMapSchema>;
        readonly cid: l.OptionalSchema<l.StringSchema<{
            readonly format: "cid";
        }>>;
        readonly live: l.BooleanSchema;
    }>;
}>, l.ObjectSchema<{
    readonly id: l.IntegerSchema;
    readonly type: l.LiteralSchema<"identity">;
    readonly identity: l.ObjectSchema<{
        readonly did: l.StringSchema<{
            readonly format: "did";
        }>;
        readonly handle: l.StringSchema<{
            readonly format: "handle";
        }>;
        readonly is_active: l.BooleanSchema;
        readonly status: l.EnumSchema<"active" | "takendown" | "suspended" | "deactivated" | "deleted">;
    }>;
}>]>;
export type RecordEvent = {
    id: number;
    type: 'record';
    action: 'create' | 'update' | 'delete';
    did: DidString;
    rev: string;
    collection: NsidString;
    rkey: string;
    record?: LexMap;
    cid?: string;
    live: boolean;
};
export type IdentityEvent = {
    id: number;
    type: 'identity';
    did: DidString;
    handle: HandleString;
    isActive: boolean;
    status: RepoStatus;
};
export type RepoStatus = 'active' | 'takendown' | 'suspended' | 'deactivated' | 'deleted';
export type TapEvent = IdentityEvent | RecordEvent;
export declare const parseTapEvent: (data: LexValue) => TapEvent;
export declare const repoInfoSchema: l.ObjectSchema<{
    readonly did: l.StringSchema<{}>;
    readonly handle: l.StringSchema<{}>;
    readonly state: l.StringSchema<{}>;
    readonly rev: l.StringSchema<{}>;
    readonly records: l.IntegerSchema;
    readonly error: l.OptionalSchema<l.StringSchema<{}>>;
    readonly retries: l.OptionalSchema<l.IntegerSchema>;
}>;
export type RepoInfo = l.Infer<typeof repoInfoSchema>;
//# sourceMappingURL=types.d.ts.map