import express from 'express';
import { ActorAccount } from '../../../../account-manager/helpers/account';
import { CodeDetail } from '../../../../account-manager/helpers/invite';
import { com } from '../../../../lexicons/index.js';
export declare function authPassthru(req: express.Request, withEncoding?: false): {
    headers: {
        authorization: string;
    };
    encoding: undefined;
} | undefined;
export declare function authPassthru(req: express.Request, withEncoding: true): {
    headers: {
        authorization: string;
    };
    encoding: 'application/json';
} | undefined;
export declare function formatAccountInfo(account: ActorAccount, { managesOwnInvites, invitedBy, invites, }: {
    managesOwnInvites: boolean;
    invites: Map<string, CodeDetail[]> | CodeDetail[];
    invitedBy: Record<string, CodeDetail>;
}): com.atproto.admin.defs.AccountView;
//# sourceMappingURL=util.d.ts.map