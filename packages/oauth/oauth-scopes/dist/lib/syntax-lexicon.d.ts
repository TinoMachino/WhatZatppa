import { LexiconPermission } from './lexicon.js';
import { ScopeSyntax } from './syntax.js';
/**
 * Translates a {@link LexiconPermission} into a {@link ScopeSyntax}.
 */
export declare class LexPermissionSyntax<P extends string = string> implements ScopeSyntax<P> {
    readonly lexPermission: LexiconPermission<P>;
    constructor(lexPermission: LexiconPermission<P>);
    get prefix(): P;
    get positional(): undefined;
    get(key: string): import("./syntax.js").ParamValue | readonly import("./syntax.js").ParamValue[] | undefined;
    keys(): Generator<string, void, unknown>;
    getSingle(key: string): import("./syntax.js").ParamValue | null | undefined;
    getMulti(key: string): readonly import("./syntax.js").ParamValue[] | null | undefined;
    toJSON(): LexiconPermission<P>;
}
//# sourceMappingURL=syntax-lexicon.d.ts.map