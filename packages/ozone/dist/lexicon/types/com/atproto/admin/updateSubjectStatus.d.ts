import { type $Typed } from '../../../../util';
import type * as ComAtprotoAdminDefs from './defs.js';
import type * as ComAtprotoRepoStrongRef from '../repo/strongRef.js';
export type QueryParams = {};
export interface InputSchema {
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | $Typed<ComAtprotoAdminDefs.RepoBlobRef> | {
        $type: string;
    };
    takedown?: ComAtprotoAdminDefs.StatusAttr;
    deactivated?: ComAtprotoAdminDefs.StatusAttr;
}
export interface OutputSchema {
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | $Typed<ComAtprotoAdminDefs.RepoBlobRef> | {
        $type: string;
    };
    takedown?: ComAtprotoAdminDefs.StatusAttr;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=updateSubjectStatus.d.ts.map