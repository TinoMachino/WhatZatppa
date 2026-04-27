"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledTakedownTag = exports.assertProtectedTagAction = exports.getProtectedTags = void 0;
const xrpc_server_1 = require("@atproto/xrpc-server");
const constants_1 = require("../../setting/constants");
const getProtectedTags = async (settingService, serviceDid) => {
    const protectedTagSetting = await settingService.query({
        keys: [constants_1.ProtectedTagSettingKey],
        scope: 'instance',
        did: serviceDid,
        limit: 1,
    });
    // if no protected tags are configured, then no need to do further check
    if (!protectedTagSetting.options.length) {
        return;
    }
    return protectedTagSetting.options[0].value;
};
exports.getProtectedTags = getProtectedTags;
const assertProtectedTagAction = ({ protectedTags, subjectTags, actionAuthor, isModerator, isAdmin, isTriage, }) => {
    subjectTags.forEach((tag) => {
        if (!Object.hasOwn(protectedTags, tag))
            return;
        if (protectedTags[tag]['moderators'] &&
            !protectedTags[tag]['moderators'].includes(actionAuthor)) {
            throw new xrpc_server_1.InvalidRequestError(`Not allowed to action on protected tag: ${tag}`);
        }
        if (protectedTags[tag]['roles']) {
            if (isAdmin) {
                if (protectedTags[tag]['roles'].includes('tools.ozone.team.defs#roleAdmin')) {
                    return;
                }
                throw new xrpc_server_1.InvalidRequestError(`Not allowed to action on protected tag: ${tag}`);
            }
            if (isModerator) {
                if (protectedTags[tag]['roles'].includes('tools.ozone.team.defs#roleModerator')) {
                    return;
                }
                throw new xrpc_server_1.InvalidRequestError(`Not allowed to action on protected tag: ${tag}`);
            }
            if (isTriage) {
                if (protectedTags[tag]['roles'].includes('tools.ozone.team.defs#roleTriage')) {
                    return;
                }
                throw new xrpc_server_1.InvalidRequestError(`Not allowed to action on protected tag: ${tag}`);
            }
        }
    });
};
exports.assertProtectedTagAction = assertProtectedTagAction;
exports.ScheduledTakedownTag = 'scheduled-takedown';
//# sourceMappingURL=util.js.map