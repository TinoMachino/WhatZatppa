import { describe, expect, it, test } from 'vitest'
import { validVectors } from './lex-json.test.js'
import { lexStringify } from './lex-stringify.js'

describe(lexStringify, () => {
  describe('validVectors', () => {
    for (const { name, lex, json } of validVectors) {
      test(name, () => {
        expect(JSON.parse(lexStringify(lex))).toStrictEqual(json)
      })
    }
  })

  describe('deeply nested structure', () => {
    it('handles deeply nested structures without throwing', () => {
      type NestedObject = { level: number; nested?: NestedObject }
      const nestedObject: NestedObject = { level: 0 }
      let current = nestedObject
      for (let i = 1; i <= 100_000; i++) {
        current.nested = { level: i }
        current = current.nested
      }

      expect(() => lexStringify(nestedObject, { maxDepth: 100_000 })).not.toThrow()
    })

    it('throws when structure exceeds max depth', () => {
      const maxDepth = 50_000
      type NestedObject = { level: number; nested?: NestedObject }
      const nestedObject: NestedObject = { level: 0 }
      let current = nestedObject
      for (let i = 1; i <= maxDepth + 1; i++) {
        current.nested = { level: i }
        current = current.nested
      }

      expect(() => lexStringify(nestedObject, { maxDepth })).toThrow(
        /Input is too deeply nested/,
      )
    })
  })
})
