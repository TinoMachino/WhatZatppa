import { LexError } from '@atproto/lex-data';
import { ResultFailure } from './result.js';
import { Issue } from './validation-issue.js';
/**
 * Error thrown when validation fails.
 *
 * Contains detailed information about all validation issues encountered,
 * including the path to each invalid value and descriptions of what was
 * expected vs what was received.
 *
 * Extends {@link LexError} with the error name "InvalidRequest" for
 * consistency with the AT Protocol error handling conventions.
 *
 * @example
 * ```typescript
 * const error = new LexValidationError([
 *   new IssueInvalidType(['user', 'age'], 'hello', ['number'])
 * ])
 * console.log(error.message)
 * // "Expected integer value type (got "some-string") at $.user.age"
 *
 * console.log(error.issues.length) // 1
 * console.log(error.toJSON())
 * // { error: 'InvalidRequest', message: '...', issues: [...] }
 * ```
 *
 * @note this class implements {@link ResultFailure} to allow it to be used
 * directly as a failure reason in validation results, avoiding the need for
 * wrapping it in an additional object.
 */
export declare class LexValidationError extends LexError<'InvalidRequest'> implements ResultFailure<LexValidationError> {
    name: string;
    /**
     * The list of validation issues that caused this error.
     *
     * Issues are aggregated when possible (e.g., multiple invalid type issues
     * at the same path are combined into a single issue listing all expected types).
     */
    readonly issues: readonly Issue[];
    /**
     * Creates a new validation error from a list of issues.
     *
     * Issues are automatically aggregated to combine related issues at the same
     * path (e.g., multiple type expectations from a union schema).
     *
     * @param issues - The validation issues that caused this error
     * @param options - Standard Error options (e.g., `cause`)
     */
    constructor(issues: Issue[], options?: ErrorOptions);
    /** @see {ResultFailure.success} */
    readonly success: false;
    /** @see {ResultFailure.reason} */
    get reason(): this;
    /**
     * Converts the error to a JSON-serializable object.
     *
     * @returns An object containing the error details and issues details
     */
    toJSON(): {
        issues: {
            code: string;
            path: readonly PropertyKey[];
            message: string;
        }[];
        error: import("@atproto/lex-data").LexErrorCode;
        message?: string;
    };
    /**
     * Creates a validation error by combining multiple validation failures.
     *
     * This is useful when validating against multiple possible schemas (e.g., unions)
     * and all branches fail. The resulting error contains issues from all failures.
     *
     * @param failures - The validation failures to combine
     * @returns A single validation error containing all issues from the failures
     *
     * @example
     * ```typescript
     * const failures = schemas.map(s => s.safeValidate(data)).filter(r => !r.success)
     * if (failures.length === schemas.length) {
     *   throw LexValidationError.fromFailures(failures)
     * }
     * ```
     */
    static fromFailures(failures: readonly ResultFailure<LexValidationError>[]): LexValidationError;
}
//# sourceMappingURL=validation-error.d.ts.map