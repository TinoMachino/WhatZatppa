"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefSchema = void 0;
exports.ref = ref;
const core_js_1 = require("../core.js");
/**
 * Schema for creating references to other schemas with lazy resolution.
 *
 * Useful for handling circular references or breaking module dependency cycles.
 * The referenced schema is resolved lazily when first needed for validation.
 *
 * @template TValidator - The referenced validator type
 *
 * @example
 * ```ts
 * // Self-referential schema for tree structure
 * const nodeSchema = l.object({
 *   value: l.string(),
 *   children: l.array(l.ref(() => nodeSchema)),
 * })
 * ```
 */
class RefSchema extends core_js_1.Schema {
    type = 'ref';
    #getter;
    constructor(getter) {
        // @NOTE In order to avoid circular dependency issues, we don't resolve
        // the schema here. Instead, we resolve it lazily when first accessed.
        super();
        this.#getter = getter;
    }
    get validator() {
        return this.#getter.call(null);
    }
    unwrap() {
        return this.validator;
    }
    validateInContext(input, ctx) {
        return ctx.validate(input, this.validator);
    }
}
exports.RefSchema = RefSchema;
function ref(get) {
    return new RefSchema(get);
}
//# sourceMappingURL=ref.js.map