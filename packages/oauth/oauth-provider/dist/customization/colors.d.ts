import { z } from 'zod';
export declare const COLOR_NAMES: readonly ["primary", "error", "warning", "info", "success"];
export type ColorName = (typeof COLOR_NAMES)[number];
export declare const colorsSchema: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    light: z.ZodOptional<z.ZodEffects<z.ZodString, import("../lib/util/color.js").RgbColor, string>>;
    dark: z.ZodOptional<z.ZodEffects<z.ZodString, import("../lib/util/color.js").RgbColor, string>>;
    contrastSaturation: z.ZodOptional<z.ZodNumber>;
}, Record<"error" | "success" | "warning" | "primary" | "info", z.ZodOptional<z.ZodEffects<z.ZodString, import("../lib/util/color.js").RgbColor, string>>>>, Record<"errorContrast" | "successContrast" | "warningContrast" | "primaryContrast" | "infoContrast", z.ZodOptional<z.ZodEffects<z.ZodString, import("../lib/util/color.js").RgbColor, string>>>>, Record<"errorHue" | "successHue" | "warningHue" | "primaryHue" | "infoHue", z.ZodOptional<z.ZodNumber>>>, "strip", z.ZodTypeAny, {
    error?: import("../lib/util/color.js").RgbColor | undefined;
    success?: import("../lib/util/color.js").RgbColor | undefined;
    warning?: import("../lib/util/color.js").RgbColor | undefined;
    light?: import("../lib/util/color.js").RgbColor | undefined;
    dark?: import("../lib/util/color.js").RgbColor | undefined;
    contrastSaturation?: number | undefined;
    primary?: import("../lib/util/color.js").RgbColor | undefined;
    info?: import("../lib/util/color.js").RgbColor | undefined;
    errorContrast?: import("../lib/util/color.js").RgbColor | undefined;
    successContrast?: import("../lib/util/color.js").RgbColor | undefined;
    warningContrast?: import("../lib/util/color.js").RgbColor | undefined;
    primaryContrast?: import("../lib/util/color.js").RgbColor | undefined;
    infoContrast?: import("../lib/util/color.js").RgbColor | undefined;
    errorHue?: number | undefined;
    successHue?: number | undefined;
    warningHue?: number | undefined;
    primaryHue?: number | undefined;
    infoHue?: number | undefined;
}, {
    error?: string | undefined;
    success?: string | undefined;
    warning?: string | undefined;
    light?: string | undefined;
    dark?: string | undefined;
    contrastSaturation?: number | undefined;
    primary?: string | undefined;
    info?: string | undefined;
    errorContrast?: string | undefined;
    successContrast?: string | undefined;
    warningContrast?: string | undefined;
    primaryContrast?: string | undefined;
    infoContrast?: string | undefined;
    errorHue?: number | undefined;
    successHue?: number | undefined;
    warningHue?: number | undefined;
    primaryHue?: number | undefined;
    infoHue?: number | undefined;
}>;
export type Colors = z.infer<typeof colorsSchema>;
//# sourceMappingURL=colors.d.ts.map