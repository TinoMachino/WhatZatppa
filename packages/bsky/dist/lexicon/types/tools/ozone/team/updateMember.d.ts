import type * as ToolsOzoneTeamDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    did: string;
    disabled?: boolean;
    role?: 'tools.ozone.team.defs#roleAdmin' | 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleVerifier' | 'tools.ozone.team.defs#roleTriage' | (string & {});
}
export type OutputSchema = ToolsOzoneTeamDefs.Member;
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
    error?: 'MemberNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=updateMember.d.ts.map