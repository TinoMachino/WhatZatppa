import assert from 'node:assert'
import { describe, it } from 'vitest'
import { lexParse } from './lex-parse.js'

describe(lexParse, () => {
  describe('depth limits', () => {
    it('supports very deeply nested structures when maxDepth is raised', () => {
      const depth = 20_000
      const input = '['.repeat(depth) + ']'.repeat(depth)
      let result = lexParse(input, { maxDepth: depth })
      for (let i = 0; i < depth; i++) {
        assert(Array.isArray(result))
        result = result[0]
      }
    })

    it('limits maximum depth by default', () => {
      const depth = 5_002
      const input = '['.repeat(depth) + ']'.repeat(depth)
      assert.throws(() => lexParse(input), /Input is too deeply nested/)
    })

    it('enforces a lower depth cap in strict mode', () => {
      const depth = 2_000
      const input = '['.repeat(depth) + ']'.repeat(depth)
      assert.throws(
        () => lexParse(input, { strict: true }),
        /Input is too deeply nested/,
      )
    })
  })
})
