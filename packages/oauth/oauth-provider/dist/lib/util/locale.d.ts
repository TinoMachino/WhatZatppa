import { z } from 'zod';
export declare const localeSchema: z.ZodString;
export type Locale = z.infer<typeof localeSchema>;
export declare const multiLangStringSchema: z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>;
export type MultiLangString = z.infer<typeof multiLangStringSchema>;
//# sourceMappingURL=locale.d.ts.map