import { type $Typed } from '../../../../util';
import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    logs: ($Typed<ChatBskyConvoDefs.LogBeginConvo> | $Typed<ChatBskyConvoDefs.LogAcceptConvo> | $Typed<ChatBskyConvoDefs.LogLeaveConvo> | $Typed<ChatBskyConvoDefs.LogMuteConvo> | $Typed<ChatBskyConvoDefs.LogUnmuteConvo> | $Typed<ChatBskyConvoDefs.LogCreateMessage> | $Typed<ChatBskyConvoDefs.LogDeleteMessage> | $Typed<ChatBskyConvoDefs.LogReadMessage> | $Typed<ChatBskyConvoDefs.LogAddReaction> | $Typed<ChatBskyConvoDefs.LogRemoveReaction> | $Typed<ChatBskyConvoDefs.LogReadConvo> | $Typed<ChatBskyConvoDefs.LogAddMember> | $Typed<ChatBskyConvoDefs.LogRemoveMember> | $Typed<ChatBskyConvoDefs.LogMemberJoin> | $Typed<ChatBskyConvoDefs.LogMemberLeave> | $Typed<ChatBskyConvoDefs.LogLockConvo> | $Typed<ChatBskyConvoDefs.LogUnlockConvo> | $Typed<ChatBskyConvoDefs.LogLockConvoPermanently> | $Typed<ChatBskyConvoDefs.LogEditGroup> | $Typed<ChatBskyConvoDefs.LogCreateJoinLink> | $Typed<ChatBskyConvoDefs.LogEditJoinLink> | $Typed<ChatBskyConvoDefs.LogEnableJoinLink> | $Typed<ChatBskyConvoDefs.LogDisableJoinLink> | $Typed<ChatBskyConvoDefs.LogIncomingJoinRequest> | $Typed<ChatBskyConvoDefs.LogApproveJoinRequest> | $Typed<ChatBskyConvoDefs.LogRejectJoinRequest> | $Typed<ChatBskyConvoDefs.LogOutgoingJoinRequest> | {
        $type: string;
    })[];
}
export type HandlerInput = void;
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
//# sourceMappingURL=getLog.d.ts.map