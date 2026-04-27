/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { Lexicons, type ValidationResult } from '@atproto/lexicon';
export declare const schemaDict: {
    readonly ComAtprotoSyncGetRecord: {
        readonly lexicon: 1;
        readonly id: "com.atproto.sync.getRecord";
        readonly defs: {
            readonly main: {
                readonly type: "query";
                readonly description: "Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.";
                readonly parameters: {
                    readonly type: "params";
                    readonly required: ["did", "collection", "rkey"];
                    readonly properties: {
                        readonly did: {
                            readonly type: "string";
                            readonly format: "did";
                            readonly description: "The DID of the repo.";
                        };
                        readonly collection: {
                            readonly type: "string";
                            readonly format: "nsid";
                        };
                        readonly rkey: {
                            readonly type: "string";
                            readonly description: "Record Key";
                            readonly format: "record-key";
                        };
                    };
                };
                readonly output: {
                    readonly encoding: "application/vnd.ipld.car";
                };
                readonly errors: [{
                    readonly name: "RecordNotFound";
                }, {
                    readonly name: "RepoNotFound";
                }, {
                    readonly name: "RepoTakendown";
                }, {
                    readonly name: "RepoSuspended";
                }, {
                    readonly name: "RepoDeactivated";
                }];
            };
        };
    };
};
export declare const schemas: {
    readonly lexicon: 1;
    readonly id: "com.atproto.sync.getRecord";
    readonly defs: {
        readonly main: {
            readonly type: "query";
            readonly description: "Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.";
            readonly parameters: {
                readonly type: "params";
                readonly required: ["did", "collection", "rkey"];
                readonly properties: {
                    readonly did: {
                        readonly type: "string";
                        readonly format: "did";
                        readonly description: "The DID of the repo.";
                    };
                    readonly collection: {
                        readonly type: "string";
                        readonly format: "nsid";
                    };
                    readonly rkey: {
                        readonly type: "string";
                        readonly description: "Record Key";
                        readonly format: "record-key";
                    };
                };
            };
            readonly output: {
                readonly encoding: "application/vnd.ipld.car";
            };
            readonly errors: [{
                readonly name: "RecordNotFound";
            }, {
                readonly name: "RepoNotFound";
            }, {
                readonly name: "RepoTakendown";
            }, {
                readonly name: "RepoSuspended";
            }, {
                readonly name: "RepoDeactivated";
            }];
        };
    };
}[];
export declare const lexicons: Lexicons;
export declare function validate<T extends {
    $type: string;
}>(v: unknown, id: string, hash: string, requiredType: true): ValidationResult<T>;
export declare function validate<T extends {
    $type?: string;
}>(v: unknown, id: string, hash: string, requiredType?: false): ValidationResult<T>;
export declare const ids: {
    readonly ComAtprotoSyncGetRecord: "com.atproto.sync.getRecord";
};
//# sourceMappingURL=lexicons.d.ts.map