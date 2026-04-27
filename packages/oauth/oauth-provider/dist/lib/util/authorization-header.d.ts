import { z } from 'zod';
export declare const authorizationHeaderSchema: z.ZodTuple<[z.ZodUnion<[z.ZodEffects<z.ZodString, "DPoP", string>, z.ZodEffects<z.ZodString, "Bearer", string>]>, z.ZodString], null>;
export declare const parseAuthorizationHeader: (header: unknown) => ["DPoP" | "Bearer", string];
//# sourceMappingURL=authorization-header.d.ts.map