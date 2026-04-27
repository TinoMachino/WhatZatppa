"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagForReport = void 0;
const getTagForReport = (reasonType) => {
    const reasonWithoutPrefix = reasonType
        .replace('com.atproto.moderation.defs#reason', '')
        .replace('tools.ozone.report.defs#reason', '');
    const kebabCase = reasonWithoutPrefix
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
    return `report:${kebabCase}`;
};
exports.getTagForReport = getTagForReport;
//# sourceMappingURL=util.js.map