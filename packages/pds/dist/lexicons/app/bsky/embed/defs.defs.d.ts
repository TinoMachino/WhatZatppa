import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.embed.defs";
export { $nsid };
/** width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit. */
type AspectRatio = {
    $type?: 'app.bsky.embed.defs#aspectRatio';
    width: number;
    height: number;
};
export type { AspectRatio };
/** width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit. */
declare const aspectRatio: l.TypedObjectSchema<"app.bsky.embed.defs#aspectRatio", l.Validator<AspectRatio, AspectRatio>>;
export { aspectRatio };
//# sourceMappingURL=defs.defs.d.ts.map