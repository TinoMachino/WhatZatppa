import { Cid, LexMap } from '@atproto/lex-data';
import { CidSet } from '@atproto/repo';
import { AtUri, AtUriString, NsidString } from '@atproto/syntax';
import { app, com } from '../../lexicons/index.js';
import { LocalRecords } from '../../read-after-write/types';
import { ActorDb, Backlink } from '../db';
export type RecordDescript = {
    uri: string;
    path: string;
    cid: Cid;
};
export declare class RecordReader {
    db: ActorDb;
    constructor(db: ActorDb);
    recordCount(): Promise<number>;
    listAll(): Promise<RecordDescript[]>;
    listCollections(): Promise<NsidString[]>;
    listRecordsForCollection(opts: {
        collection: string;
        limit: number;
        reverse: boolean;
        cursor?: string;
        rkeyStart?: string;
        rkeyEnd?: string;
        includeSoftDeleted?: boolean;
    }): Promise<{
        uri: AtUriString;
        cid: string;
        value: LexMap;
    }[]>;
    getRecord(uri: AtUri, cid: string | null, includeSoftDeleted?: boolean): Promise<{
        uri: string;
        cid: string;
        value: LexMap;
        indexedAt: string;
        takedownRef: string | null;
    } | null>;
    hasRecord(uri: AtUri, cid: string | null, includeSoftDeleted?: boolean): Promise<boolean>;
    getRecordTakedownStatus(uri: AtUri): Promise<com.atproto.admin.defs.StatusAttr | null>;
    getCurrentRecordCid(uri: AtUri): Promise<Cid | null>;
    getRecordBacklinks(opts: {
        collection: string;
        path: string;
        linkTo: string;
    }): Promise<{
        uri: string;
        cid: string;
        indexedAt: string;
        collection: string;
        rkey: string;
        repoRev: string;
        takedownRef: string | null;
    }[]>;
    getBacklinkConflicts(uri: AtUri, record: LexMap): Promise<AtUri[]>;
    listExistingBlocks(): Promise<CidSet>;
    getProfileRecord(): Promise<app.bsky.actor.profile.$defs.Main | null>;
    getRecordsSinceRev(rev: string): Promise<LocalRecords>;
}
export declare const getBacklinks: (uri: AtUri, record: LexMap) => Backlink[];
//# sourceMappingURL=reader.d.ts.map