import { z } from 'zod';
export declare const linksSchema: z.ZodObject<{
    title: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>]>;
    href: z.ZodString;
    rel: z.ZodOptional<z.ZodEffects<z.ZodString, "search" | "expect" | "manifest" | "alternate" | "author" | "canonical" | "dns-prefetch" | "external" | "help" | "icon" | "license" | "me" | "modulepreload" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prerender" | "prev" | "privacy-policy" | "stylesheet" | "terms-of-service", string>>;
}, "strip", z.ZodTypeAny, {
    href: string;
    title: string | Record<string, string | undefined>;
    rel?: "search" | "expect" | "manifest" | "alternate" | "author" | "canonical" | "dns-prefetch" | "external" | "help" | "icon" | "license" | "me" | "modulepreload" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prerender" | "prev" | "privacy-policy" | "stylesheet" | "terms-of-service" | undefined;
}, {
    href: string;
    title: string | Record<string, string | undefined>;
    rel?: string | undefined;
}>;
export type Links = z.infer<typeof linksSchema>;
//# sourceMappingURL=links.d.ts.map