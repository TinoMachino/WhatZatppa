import { Cid, LexMap } from '@atproto/lex-data';
import { RecordCreateOp, RecordDeleteOp, RecordUpdateOp, RecordWriteOp } from '@atproto/repo';
import { DidString, NsidString, RecordKeyString } from '@atproto/syntax';
import { PreparedCreate, PreparedDelete, PreparedUpdate, PreparedWrite } from './types';
export declare const prepareCreate: (opts: {
    did: DidString;
    collection: NsidString;
    rkey?: RecordKeyString;
    swapCid?: Cid | null;
    record: LexMap;
    validate?: boolean;
    validationPath?: (string | number)[];
}) => Promise<PreparedCreate>;
export declare const prepareUpdate: (opts: {
    did: DidString;
    collection: NsidString;
    rkey: RecordKeyString;
    swapCid?: Cid | null;
    record: LexMap;
    validate?: boolean;
    validationPath?: (string | number)[];
}) => Promise<PreparedUpdate>;
export declare const prepareDelete: (opts: {
    did: DidString;
    collection: NsidString;
    rkey: RecordKeyString;
    swapCid?: Cid | null;
}) => PreparedDelete;
export declare const createWriteToOp: (write: PreparedCreate) => RecordCreateOp;
export declare const updateWriteToOp: (write: PreparedUpdate) => RecordUpdateOp;
export declare const deleteWriteToOp: (write: PreparedDelete) => RecordDeleteOp;
export declare const writeToOp: (write: PreparedWrite) => RecordWriteOp;
//# sourceMappingURL=prepare.d.ts.map