import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { ensureValidAtUri, isValidAtUri } from '../src'

describe('valid interop', () => {
  for (const value of readLines(
    `${__dirname}/../../../interop-test-files/syntax/aturi_syntax_valid.txt`,
  )) {
    testValid(value)
  }
})

describe('custom cases', () => {
  describe('valid spec basics', () => {
    testValid('at://did:plc:asdf123')
    testValid('at://user.bsky.social')
    testValid('at://did:plc:asdf123/com.atproto.feed.post')
    testValid('at://did:plc:asdf123/com.atproto.feed.post/record')

    testValid('at://did:plc:asdf123#/frag')
    testValid('at://user.bsky.social#/frag')
    testValid('at://did:plc:asdf123/com.atproto.feed.post#/frag')
    testValid('at://did:plc:asdf123/com.atproto.feed.post/record#/frag')
  })

  describe('invalid spec basics', () => {
    testInvalid('a://did:plc:asdf123')
    testInvalid('at//did:plc:asdf123')
    testInvalid('at:/a/did:plc:asdf123')
    testInvalid('at:/did:plc:asdf123')
    testInvalid('AT://did:plc:asdf123')
    testInvalid('http://did:plc:asdf123')
    testInvalid('://did:plc:asdf123')
    testInvalid('at:did:plc:asdf123')
    testInvalid('at:/did:plc:asdf123')
    testInvalid('at:///did:plc:asdf123')
    testInvalid('at://:/did:plc:asdf123')
    testInvalid('at:/ /did:plc:asdf123')
    testInvalid('at://did:plc:asdf123 ')
    testInvalid('at://did:plc:asdf123/ ')
    testInvalid(' at://did:plc:asdf123')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.post ')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.post# ')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.post#/ ')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.post#/frag ')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.post#fr ag')
    testInvalid('//did:plc:asdf123')
    testInvalid('at://name')
    testInvalid('at://name.0')
    testInvalid('at://diD:plc:asdf123')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.p@st')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.p$st')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.p%st')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.p&st')
    testInvalid('at://did:plc:asdf123/com.atproto.feed.p()t')
    testInvalid('at://did:plc:asdf123/com.atproto.feed_post')
    testInvalid('at://did:plc:asdf123/-com.atproto.feed.post')
    testInvalid('at://did:plc:asdf@123/com.atproto.feed.post')

    testInvalid('at://DID:plc:asdf123')
    testInvalid('at://user.bsky.123')
    testInvalid('at://bsky')
    testInvalid('at://did:plc:')
    testInvalid('at://did:plc:')
    testInvalid('at://frag')
  })
})

function testValid(value: string) {
  test(value, () => {
    expect(isValidAtUri(value)).toBe(true)
    expect(() => ensureValidAtUri(value)).not.toThrow()
  })
}

function testInvalid(value: string) {
  test(value, () => {
    expect(isValidAtUri(value)).toBe(false)
  })
}

function readLines(filePath: string): string[] {
  return readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .filter((line) => !line.startsWith('#') && line.length > 0)
}
