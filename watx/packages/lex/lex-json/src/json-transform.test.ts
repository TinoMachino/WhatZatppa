import { describe, expect, it } from 'vitest'
import { jsonTransform } from './json-transform.js'

const noop = () => {}

describe(jsonTransform, () => {
  it('rejects undefined at the root', () => {
    expect(() => jsonTransform(undefined, noop)).toThrow(
      'Invalid undefined value at $',
    )
  })

  it('tracks invalid number paths in strict mode', () => {
    expect(() =>
      jsonTransform({ outer: [{ value: 1.5 }] }, noop, { strict: true }),
    ).toThrow('Invalid number (got 1.5) at $.outer[0].value')
  })

  it('omits undefined object properties and nulls undefined array values', () => {
    expect(
      jsonTransform(
        { keep: 1, drop: undefined, nested: [1, undefined, 3] },
        noop,
      ),
    ).toStrictEqual({
      keep: 1,
      nested: [1, null, 3],
    })
  })

  it('supports very deeply nested arrays', () => {
    let nested: unknown = []
    for (let i = 0; i < 4000; i++) {
      nested = [nested]
    }

    const result = jsonTransform({ nested }, noop)
    let check = (result as { nested: unknown }).nested

    for (let i = 0; i < 4000; i++) {
      expect(Array.isArray(check)).toBe(true)
      check = (check as unknown[])[0]
    }
  })
})
