export type ResultSuccess<V = any> = {
    success: true;
    value: V;
};
/**
 * Represents a failed result containing an error reason.
 *
 * @typeParam E - The type of the error reason
 */
export type ResultFailure<E = Error> = {
    success: false;
    reason: E;
};
/**
 * A discriminated union type representing either a success or failure outcome.
 *
 * Check the `success` property to determine the outcome and access the
 * appropriate property (`value` for success, `reason` for failure).
 *
 * @typeParam V - The type of the success value
 * @typeParam E - The type of the error reason
 *
 * @example
 * ```typescript
 * function parseJson(text: string): Result<unknown, SyntaxError> {
 *   try {
 *     return success(JSON.parse(text))
 *   } catch (e) {
 *     return failure(e as SyntaxError)
 *   }
 * }
 * ```
 */
export type Result<V = any, E = Error> = ResultSuccess<V> | ResultFailure<E>;
/**
 * Creates a successful result wrapping the given value.
 *
 * @typeParam V - The type of the value
 * @param value - The success value to wrap
 * @returns {ResultSuccess} A success result containing the value
 *
 * @example
 * ```typescript
 * const result = success(42)
 * console.log(result.success) // true
 * console.log(result.value)   // 42
 * ```
 */
export declare function success<V>(value: V): ResultSuccess<V>;
/**
 * Creates a failed result wrapping the given error reason.
 *
 * @typeParam E - The type of the error reason
 * @param reason - The error reason to wrap
 * @returns {ResultFailure} A failure result containing the error
 *
 * @example
 * ```typescript
 * const result = failure(new Error('Something went wrong'))
 * console.log(result.success) // false
 * console.log(result.reason.message) // "Something went wrong"
 * ```
 */
export declare function failure<E>(reason: E): ResultFailure<E>;
/**
 * Extracts the error reason from a failure result.
 *
 * @typeParam T - The type of the error reason
 * @param result - A failure result
 * @returns {T} The error reason
 *
 * @example
 * ```typescript
 * const result = failure(new Error('oops'))
 * const error = failureReason(result)
 * console.log(error.message) // "oops"
 * ```
 */
export declare function failureReason<T>(result: ResultFailure<T>): T;
/**
 * Extracts the value from a success result.
 *
 * @typeParam T - The type of the success value
 * @param result - A success result
 * @returns {T} The success value
 *
 * @example
 * ```typescript
 * const result = success(42)
 * const value = successValue(result)
 * console.log(value) // 42
 * ```
 */
export declare function successValue<T>(result: ResultSuccess<T>): T;
/**
 * Catches any error and wraps it in a {@link ResultFailure<Error>}.
 *
 * @param err - The error to catch.
 * @returns {ResultFailure} A failure result containing the error.
 * @example
 *
 * ```ts
 * declare function someFunction(): Promise<string>
 *
 * const result = await someFunction().then(success, catchall)
 * if (result.success) {
 *   console.log(result.value) // string
 * } else {
 *   console.error(result.reason instanceof Error) // true
 *   console.error(result.reason.message) // string
 * }
 * ```
 */
export declare function catchall(err: unknown): ResultFailure<Error>;
/**
 * Creates a catcher function for the given constructor that wraps caught errors
 * in a {@link ResultFailure}.
 *
 * @example
 *
 * ```ts
 * class FooError extends Error {}
 * class BarError extends Error {}
 *
 * declare function someFunction(): Promise<string>
 *
 * const result = await someFunction()
 *   .then(success)
 *   .catch(createCatcher(FooError))
 *   .catch(createCatcher(BarError))
 *
 * if (result.success) {
 *   console.log(result.value) // string
 * } else {
 *   console.error(result.reason) // FooError | BarError
 * }
 */
export declare function createCatcher<T>(Ctor: new (...args: any[]) => T): (err: unknown) => ResultFailure<T>;
//# sourceMappingURL=result.d.ts.map