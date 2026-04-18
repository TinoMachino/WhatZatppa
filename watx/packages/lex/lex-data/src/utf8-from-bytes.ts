import { NodeJSBuffer } from './lib/nodejs-buffer.js'

const Buffer = NodeJSBuffer

export const utf8FromBytesNode = Buffer
  ? function utf8FromBytesNode(bytes: Uint8Array): string {
      const buffer = Buffer.from(bytes)
      return buffer.toString('utf8')
    }
  : /* v8 ignore next -- @preserve */ null

export function utf8FromBytesNative(bytes: Uint8Array): string {
  return new TextDecoder('utf-8').decode(bytes)
}
