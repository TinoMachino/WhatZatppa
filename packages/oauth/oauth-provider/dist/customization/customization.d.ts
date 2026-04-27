import { z } from 'zod';
export declare const customizationSchema: z.ZodObject<{
    /**
     * Available user domains that can be used to sign up. A non-empty array
     * is required to enable the sign-up feature.
     */
    availableUserDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * UI customizations
     */
    branding: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        logo: z.ZodOptional<z.ZodString>;
        colors: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<{
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
        }>>;
        links: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        logo?: string | undefined;
        colors?: {
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
        } | undefined;
        links?: {
            href: string;
            title: string | Record<string, string | undefined>;
            rel?: "search" | "expect" | "manifest" | "alternate" | "author" | "canonical" | "dns-prefetch" | "external" | "help" | "icon" | "license" | "me" | "modulepreload" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prerender" | "prev" | "privacy-policy" | "stylesheet" | "terms-of-service" | undefined;
        }[] | undefined;
    }, {
        name?: string | undefined;
        logo?: string | undefined;
        colors?: {
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
        } | undefined;
        links?: {
            href: string;
            title: string | Record<string, string | undefined>;
            rel?: string | undefined;
        }[] | undefined;
    }>>;
    /**
     * Is an invite code required to sign up?
     */
    inviteCodeRequired: z.ZodOptional<z.ZodBoolean>;
    /**
     * Enables hCaptcha during sign-up.
     */
    hcaptcha: z.ZodOptional<z.ZodObject<{
        siteKey: z.ZodString;
        secretKey: z.ZodString;
        tokenSalt: z.ZodString;
        scoreThreshold: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        siteKey: string;
        secretKey: string;
        tokenSalt: string;
        scoreThreshold?: number | undefined;
    }, {
        siteKey: string;
        secretKey: string;
        tokenSalt: string;
        scoreThreshold?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    availableUserDomains?: string[] | undefined;
    branding?: {
        name?: string | undefined;
        logo?: string | undefined;
        colors?: {
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
        } | undefined;
        links?: {
            href: string;
            title: string | Record<string, string | undefined>;
            rel?: "search" | "expect" | "manifest" | "alternate" | "author" | "canonical" | "dns-prefetch" | "external" | "help" | "icon" | "license" | "me" | "modulepreload" | "next" | "pingback" | "preconnect" | "prefetch" | "preload" | "prerender" | "prev" | "privacy-policy" | "stylesheet" | "terms-of-service" | undefined;
        }[] | undefined;
    } | undefined;
    inviteCodeRequired?: boolean | undefined;
    hcaptcha?: {
        siteKey: string;
        secretKey: string;
        tokenSalt: string;
        scoreThreshold?: number | undefined;
    } | undefined;
}, {
    availableUserDomains?: string[] | undefined;
    branding?: {
        name?: string | undefined;
        logo?: string | undefined;
        colors?: {
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
        } | undefined;
        links?: {
            href: string;
            title: string | Record<string, string | undefined>;
            rel?: string | undefined;
        }[] | undefined;
    } | undefined;
    inviteCodeRequired?: boolean | undefined;
    hcaptcha?: {
        siteKey: string;
        secretKey: string;
        tokenSalt: string;
        scoreThreshold?: number | undefined;
    } | undefined;
}>;
export type CustomizationInput = z.input<typeof customizationSchema>;
export type Customization = z.infer<typeof customizationSchema>;
//# sourceMappingURL=customization.d.ts.map