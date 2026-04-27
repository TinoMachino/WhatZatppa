"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProfile = void 0;
class ServiceProfile {
    constructor(pds, 
    /** @note assumes the session is already authenticated */
    agent, userDetails) {
        Object.defineProperty(this, "pds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pds
        });
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: agent
        });
        Object.defineProperty(this, "userDetails", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: userDetails
        });
    }
    get did() {
        return this.agent.assertDid;
    }
    async migrateTo(newPds, options = {}) {
        const newAgent = newPds.getAgent();
        const newPdsDesc = await newAgent.com.atproto.server.describeServer();
        const serviceAuth = await this.agent.com.atproto.server.getServiceAuth({
            aud: newPdsDesc.data.did,
            lxm: 'com.atproto.server.createAccount',
        });
        const inviteCode = newPds.ctx.cfg.invites.required
            ? await newAgent.com.atproto.server
                .createInviteCode({ useCount: 1 }, {
                encoding: 'application/json',
                headers: newPds.adminAuthHeaders(),
            })
                .then((res) => res.data.code)
            : undefined;
        await newAgent.createAccount({
            ...this.userDetails,
            inviteCode,
            did: this.did,
        }, {
            encoding: 'application/json',
            headers: { authorization: `Bearer ${serviceAuth.data.token}` },
        });
        // The session manager will use the "didDoc" in the result of
        // "createAccount" in order to setup the pdsUrl. However, since are in the
        // process of migrating, that didDoc references the old PDS. In order to
        // avoid calling the old PDS, let's clear the pdsUrl, which will result in
        // the (new) serviceUrl being used.
        newAgent.sessionManager.pdsUrl = undefined;
        const newDidCredentialsRes = await newAgent.com.atproto.identity.getRecommendedDidCredentials();
        await this.agent.com.atproto.identity.requestPlcOperationSignature();
        const { token } = await this.pds.ctx.accountManager.db.db
            .selectFrom('email_token')
            .select('token')
            .where('did', '=', this.did)
            .where('purpose', '=', 'plc_operation')
            .executeTakeFirstOrThrow();
        const op = { ...newDidCredentialsRes.data, token };
        Object.assign((op.services ?? (op.services = {})), options.services);
        Object.assign((op.verificationMethods ?? (op.verificationMethods = {})), options.verificationMethods);
        const signedPlcOperation = await this.agent.com.atproto.identity.signPlcOperation(op);
        await newAgent.com.atproto.identity.submitPlcOperation({
            operation: signedPlcOperation.data.operation,
        });
        await newAgent.com.atproto.server.activateAccount();
        this.pds = newPds;
        this.agent = newAgent;
    }
}
exports.ServiceProfile = ServiceProfile;
//# sourceMappingURL=service-profile.js.map