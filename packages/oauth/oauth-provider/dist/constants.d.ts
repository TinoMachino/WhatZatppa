export declare const DEVICE_ID_PREFIX = "dev-";
export declare const DEVICE_ID_BYTES_LENGTH = 16;
export declare const SESSION_ID_PREFIX = "ses-";
export declare const SESSION_ID_BYTES_LENGTH = 16;
export declare const REFRESH_TOKEN_PREFIX = "ref-";
export declare const REFRESH_TOKEN_BYTES_LENGTH = 32;
export declare const TOKEN_ID_PREFIX = "tok-";
export declare const TOKEN_ID_BYTES_LENGTH = 16;
export declare const REQUEST_ID_PREFIX = "req-";
export declare const REQUEST_ID_BYTES_LENGTH = 16;
export declare const CODE_PREFIX = "cod-";
export declare const CODE_BYTES_LENGTH = 32;
/** 7 days */
export declare const AUTHENTICATION_MAX_AGE: number;
/** 15 minutes */
export declare const EPHEMERAL_SESSION_MAX_AGE: number;
/** 60 minutes */
export declare const TOKEN_MAX_AGE: number;
/** 5 minutes */
export declare const AUTHORIZATION_INACTIVITY_TIMEOUT: number;
/** 2 week */
export declare const PUBLIC_CLIENT_SESSION_LIFETIME: number;
/** @see {@link PUBLIC_CLIENT_SESSION_LIFETIME} */
export declare const PUBLIC_CLIENT_REFRESH_LIFETIME: number;
/** 2 years */
export declare const CONFIDENTIAL_CLIENT_SESSION_LIFETIME: number;
/** 3 months */
export declare const CONFIDENTIAL_CLIENT_REFRESH_LIFETIME: number;
/** 5 minutes */
export declare const PAR_EXPIRES_IN: number;
/**
 * 59 seconds (should be less than a minute)
 *
 * > "A general guidance for the validity time would be less than a minute."
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9101#section-10.2 | JWT-Secured Authorization Request (JAR) - Section 10.2 (d)}
 */
export declare const JAR_MAX_AGE: number;
/** 1 minute */
export declare const CLIENT_ASSERTION_MAX_AGE: number;
/** 3 minutes */
export declare const DPOP_NONCE_MAX_AGE: number;
/** 5 seconds */
export declare const SESSION_FIXATION_MAX_AGE: number;
/** 1 day */
export declare const CODE_CHALLENGE_REPLAY_TIMEFRAME: number;
/** 5 minutes */
export declare const LEXICON_REFRESH_FREQUENCY: number;
export declare const NODE_ENV: string;
//# sourceMappingURL=constants.d.ts.map