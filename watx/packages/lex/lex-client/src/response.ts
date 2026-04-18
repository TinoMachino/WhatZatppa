import { LexParseOptions, lexParseJsonBytes } from '@atproto/lex-json'
import {
  InferMethodOutputEncoding,
  Procedure,
  Query,
  ResultSuccess,
} from '@atproto/lex-schema'
import {
  XrpcAuthenticationError,
  XrpcInvalidResponseError,
  XrpcResponseError,
  XrpcUpstreamError,
  isXrpcErrorPayload,
} from './errors.js'
import { XrpcResponseBody, XrpcResponsePayload } from './util.js'

const CONTENT_TYPE_BINARY = 'application/octet-stream'
const CONTENT_TYPE_JSON = 'application/json'

export type { XrpcResponseBody, XrpcResponsePayload }

export type XrpcResponseOptions = {
  /**
   * Whether to validate the response against the method's output schema.
   *
   * @default true
   */
  validateResponse?: boolean

  /**
   * Whether to strictly parse JSON response bodies as Lex values.
   *
   * @default true
   */
  strictResponseProcessing?: boolean
}

/**
 * Small container for XRPC response data.
 *
 * @implements {ResultSuccess<XrpcResponse<M>>} for convenience in result handling contexts.
 */
export class XrpcResponse<M extends Procedure | Query>
  implements ResultSuccess<XrpcResponse<M>>
{
  /** @see {@link ResultSuccess.success} */
  readonly success = true as const

  /** @see {@link ResultSuccess.value} */
  get value(): this {
    return this
  }

  constructor(
    readonly method: M,
    readonly status: number,
    readonly headers: Headers,
    readonly payload: XrpcResponsePayload<M>,
  ) {}

  /**
   * Whether the response payload was parsed as {@link LexValue} (`true`) or is
   * in binary form {@link Uint8Array} (`false`).
   */
  get isParsed() {
    return this.method.output.encoding === CONTENT_TYPE_JSON
  }

  /**
   * The Content-Type encoding of the response (e.g., 'application/json').
   * Returns `undefined` if the response has no body.
   */
  get encoding() {
    return this.payload?.encoding as InferMethodOutputEncoding<M>
  }

  /**
   * The parsed response body.
   *
   * For 'application/json' responses, this is the parsed and validated LexValue.
   * For binary responses, this is a Uint8Array.
   * Returns `undefined` if the response has no body.
   */
  get body() {
    return this.payload?.body as XrpcResponseBody<M>
  }

  /**
   * @throws {XrpcResponseError} in case of (valid) XRPC error responses. Use
   * {@link XrpcResponseError.matchesSchemaErrors} to narrow the error type based on
   * the method's declared error schema. This can be narrowed further as a
   * {@link XrpcAuthenticationError} if the error is an authentication error.
   * @throws {XrpcUpstreamError} when the response is not a valid XRPC
   * response, or if the response does not conform to the method's schema.
   */
  static async fromFetchResponse<const M extends Procedure | Query>(
    method: M,
    response: Response,
    options?: XrpcResponseOptions,
  ): Promise<XrpcResponse<M>> {
    // @NOTE The body MUST either be read or canceled to avoid resource leaks.
    // Since nothing should cause an exception before "readPayload" is
    // called, we can safely not use a try/finally here.

    // @NOTE redirect is set to 'follow', so we shouldn't get 3xx responses here
    if (response.status < 200 || response.status >= 300) {
      // Always parse json for error responses
      const payload = await readPayload(response, {
        parse: { strict: false },
      }).catch(
        (cause) => {
          throw new XrpcUpstreamError(
            method,
            response,
            null,
            'Unable to parse response payload',
            { cause },
          )
        },
      )

      // Properly formatted XRPC error response ?
      if (response.status >= 400 && isXrpcErrorPayload(payload)) {
        throw response.status === 401
          ? new XrpcAuthenticationError<M>(method, response, payload)
          : new XrpcResponseError<M>(method, response, payload)
      }

      // Invalid XRPC response (we probably did not hit an XRPC implementation)
      throw new XrpcUpstreamError(
        method,
        response,
        payload,
        response.status >= 500
          ? 'Upstream server encountered an error'
          : response.status >= 400
            ? 'Invalid response payload'
            : 'Invalid response status code',
      )
    }

    // Only parse json if the schema expects it
    const payload = await readPayload(response, {
      parse:
        method.output.encoding === CONTENT_TYPE_JSON
          ? { strict: options?.strictResponseProcessing ?? true }
          : method.output.encoding == null
            ? { strict: false }
          : false,
    }).catch((cause) => {
      throw new XrpcUpstreamError(
        method,
        response,
        null,
        'Unable to parse response payload',
        { cause },
      )
    })

    if (!method.output.matchesEncoding(payload?.encoding)) {
      throw new XrpcUpstreamError(
        method,
        response,
        payload,
        `Expected ${stringifyEncoding(method.output.encoding)} response, got ${stringifyEncoding(payload?.encoding)}`,
      )
    }

    // Response is successful (2xx). Validate payload (data and encoding) against schema.
    if (method.output.encoding != null) {
      if (!payload) throw new Error('Expected payload')
      // Assert valid response body.
      if (method.output.schema && options?.validateResponse !== false) {
        const result = method.output.schema.safeParse(payload.body, {
          strict: options?.strictResponseProcessing ?? true,
        })

        if (!result.success) {
          throw new XrpcInvalidResponseError(
            method,
            response,
            payload,
            result.reason,
          )
        }
      }
    }

    return new XrpcResponse<M>(
      method,
      response.status,
      response.headers,
      payload as XrpcResponsePayload<M>,
    )
  }
}

/**
 * @note this function always consumes the response body
 */
async function readPayload(
  response: Response,
  options?: { parse?: boolean | LexParseOptions },
): Promise<XrpcResponsePayload> {
  // @TODO Should we limit the maximum response size here (this could also be
  // done by the FetchHandler)?

  const encoding = response.headers
    .get('content-type')
    ?.split(';')[0]
    .trim()
    .toLowerCase()

  // Response content-type is undefined
  if (!encoding) {
    // If the body is empty, return undefined (= no payload)
    const body = await response.arrayBuffer()
    if (body.byteLength === 0) return undefined

    // If we got data despite no content-type, treat it as binary
    return {
      encoding: CONTENT_TYPE_BINARY,
      body: new Uint8Array(body),
    }
  }

  if (options?.parse && encoding === CONTENT_TYPE_JSON) {
    const arrayBuffer = await response.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    return {
      encoding,
      body: lexParseJsonBytes(
        bytes,
        options.parse === true ? undefined : options.parse,
      ),
    }
  }

  return { encoding, body: new Uint8Array(await response.arrayBuffer()) }
}

function stringifyEncoding(encoding: string | undefined) {
  return encoding ? `"${encoding}"` : 'no payload'
}
