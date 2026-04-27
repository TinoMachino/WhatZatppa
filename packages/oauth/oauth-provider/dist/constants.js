"use strict";
// The purpose of the prefix is to provide type safety
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.LEXICON_REFRESH_FREQUENCY = exports.CODE_CHALLENGE_REPLAY_TIMEFRAME = exports.SESSION_FIXATION_MAX_AGE = exports.DPOP_NONCE_MAX_AGE = exports.CLIENT_ASSERTION_MAX_AGE = exports.JAR_MAX_AGE = exports.PAR_EXPIRES_IN = exports.CONFIDENTIAL_CLIENT_REFRESH_LIFETIME = exports.CONFIDENTIAL_CLIENT_SESSION_LIFETIME = exports.PUBLIC_CLIENT_REFRESH_LIFETIME = exports.PUBLIC_CLIENT_SESSION_LIFETIME = exports.AUTHORIZATION_INACTIVITY_TIMEOUT = exports.TOKEN_MAX_AGE = exports.EPHEMERAL_SESSION_MAX_AGE = exports.AUTHENTICATION_MAX_AGE = exports.CODE_BYTES_LENGTH = exports.CODE_PREFIX = exports.REQUEST_ID_BYTES_LENGTH = exports.REQUEST_ID_PREFIX = exports.TOKEN_ID_BYTES_LENGTH = exports.TOKEN_ID_PREFIX = exports.REFRESH_TOKEN_BYTES_LENGTH = exports.REFRESH_TOKEN_PREFIX = exports.SESSION_ID_BYTES_LENGTH = exports.SESSION_ID_PREFIX = exports.DEVICE_ID_BYTES_LENGTH = exports.DEVICE_ID_PREFIX = void 0;
exports.DEVICE_ID_PREFIX = 'dev-';
exports.DEVICE_ID_BYTES_LENGTH = 16; // 128 bits
exports.SESSION_ID_PREFIX = 'ses-';
exports.SESSION_ID_BYTES_LENGTH = 16; // 128 bits - only valid if device id is valid
exports.REFRESH_TOKEN_PREFIX = 'ref-';
exports.REFRESH_TOKEN_BYTES_LENGTH = 32; // 256 bits
exports.TOKEN_ID_PREFIX = 'tok-';
exports.TOKEN_ID_BYTES_LENGTH = 16; // 128 bits - used as `jti` in JWTs (cannot be forged)
exports.REQUEST_ID_PREFIX = 'req-';
exports.REQUEST_ID_BYTES_LENGTH = 16; // 128 bits
exports.CODE_PREFIX = 'cod-';
exports.CODE_BYTES_LENGTH = 32;
const SECOND = 1e3;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365.25 * DAY;
const MONTH = YEAR / 12;
/** 7 days */
exports.AUTHENTICATION_MAX_AGE = 7 * DAY;
/** 15 minutes */
exports.EPHEMERAL_SESSION_MAX_AGE = 15 * MINUTE;
/** 60 minutes */
exports.TOKEN_MAX_AGE = 60 * MINUTE;
/** 5 minutes */
exports.AUTHORIZATION_INACTIVITY_TIMEOUT = 5 * MINUTE;
/** 2 week */
exports.PUBLIC_CLIENT_SESSION_LIFETIME = 2 * WEEK;
/** @see {@link PUBLIC_CLIENT_SESSION_LIFETIME} */
exports.PUBLIC_CLIENT_REFRESH_LIFETIME = exports.PUBLIC_CLIENT_SESSION_LIFETIME;
/** 2 years */
exports.CONFIDENTIAL_CLIENT_SESSION_LIFETIME = 2 * YEAR;
/** 3 months */
exports.CONFIDENTIAL_CLIENT_REFRESH_LIFETIME = 3 * MONTH;
/** 5 minutes */
exports.PAR_EXPIRES_IN = 5 * MINUTE;
/**
 * 59 seconds (should be less than a minute)
 *
 * > "A general guidance for the validity time would be less than a minute."
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9101#section-10.2 | JWT-Secured Authorization Request (JAR) - Section 10.2 (d)}
 */
exports.JAR_MAX_AGE = 59 * SECOND;
/** 1 minute */
exports.CLIENT_ASSERTION_MAX_AGE = 1 * MINUTE;
/** 3 minutes */
exports.DPOP_NONCE_MAX_AGE = 3 * MINUTE;
/** 5 seconds */
exports.SESSION_FIXATION_MAX_AGE = 5 * SECOND;
/** 1 day */
exports.CODE_CHALLENGE_REPLAY_TIMEFRAME = 1 * DAY;
/** 5 minutes */
exports.LEXICON_REFRESH_FREQUENCY = 5 * MINUTE;
exports.NODE_ENV = process.env.NODE_ENV || 'production';
//# sourceMappingURL=constants.js.map