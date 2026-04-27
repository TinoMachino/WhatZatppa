import { Cid, LexMap } from '@atproto/lex-data';
import { BlobStore, WriteOpAction } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
import { com } from '../../lexicons/index.js';
import { ActorDb, Backlink } from '../db';
import { RecordReader } from './reader';
export declare class RecordTransactor extends RecordReader {
    db: ActorDb;
    blobstore: BlobStore;
    constructor(db: ActorDb, blobstore: BlobStore);
    indexRecord(uri: AtUri, cid: Cid, record: LexMap | null, action: (WriteOpAction.Create | WriteOpAction.Update) | undefined, repoRev: string, timestamp?: string): Promise<void>;
    deleteRecord(uri: AtUri): Promise<void>;
    removeBacklinksByUri(uri: AtUri): Promise<void>;
    addBacklinks(backlinks: Backlink[]): Promise<void>;
    updateRecordTakedownStatus(uri: AtUri, takedown: com.atproto.admin.defs.StatusAttr): Promise<void>;
}
//# sourceMappingURL=transactor.d.ts.map