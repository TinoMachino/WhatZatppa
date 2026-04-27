"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = formatZodError;
exports.formatZodIssue = formatZodIssue;
const zod_1 = require("zod");
function formatZodError(err, prefix) {
    const message = err.issues.length
        ? err.issues.map(formatZodIssue).join('; ')
        : err.message; // Should never happen (issues should never be empty)
    return prefix ? `${prefix}: ${message}` : message;
}
function formatZodIssue(issue) {
    if (issue.code === zod_1.ZodIssueCode.invalid_union) {
        return issue.unionErrors
            .map((err) => err.issues.map(formatZodIssue).join('; '))
            .join(', or ');
    }
    if (issue.path.length === 1 && typeof issue.path[0] === 'number') {
        return `${issue.message} at index ${issue.path[0]}`;
    }
    if (issue.path.length) {
        return `${issue.message} at ${issue.path.join('.')}`;
    }
    return issue.message;
}
//# sourceMappingURL=zod-error.js.map