import { Sub } from '../oidc/sub.js'
import { InvalidRequestError } from './invalid-request-error.js'

/**
 * Thrown by {@link AccountStore.authenticateAccount} implementations to signal
 * that a sign-in attempt was rejected because the provided credentials did not
 * match a known account.
 *
 * Stores should populate {@link InvalidCredentialsError.sub} when the
 * identifier resolved to an existing account but e.g. the password or OTP was
 * incorrect. The identifier-unknown case should leave `sub` unset. This
 * information is surfaced to the `onSignInFailed` hook and never sent back to
 * the client, so populating it does not affect the client-visible response.
 *
 * Only the subject identifier (DID) is carried, not a full `Account`, to
 * avoid embedding PII in an error that may be serialized by loggers or tools
 * walking the `.cause` chain.
 */
export class InvalidCredentialsError extends InvalidRequestError {
  constructor(
    message = 'Invalid identifier or password',
    public readonly sub?: Sub,
    cause?: unknown,
  ) {
    super(message, cause)
  }
}
