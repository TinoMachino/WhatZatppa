"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCustomizationCss = buildCustomizationCss;
const color_js_1 = require("../lib/util/color.js");
const colors_js_1 = require("./colors.js");
function buildCustomizationCss({ branding, }) {
    const vars = Array.from(buildCustomizationVars(branding));
    if (vars.length)
        return `:root { ${vars.join(' ')} }`;
}
function* buildCustomizationVars(branding) {
    if (branding?.colors) {
        const contrastSaturation = branding.colors.contrastSaturation ?? 30;
        yield `--contrast-sat: ${contrastSaturation.toFixed(2)}%;`;
        const contrastLight = branding.colors.light ??
            // Corresponds to color-contrast-975
            (0, color_js_1.hslToRgb)({
                h: branding.colors.primaryHue ?? 0,
                s: contrastSaturation / 100,
                l: 0.07,
            });
        const contrastDark = branding.colors.dark ??
            // Corresponds to color-contrast-25
            (0, color_js_1.hslToRgb)({
                h: branding.colors.primaryHue ?? 0,
                s: contrastSaturation / 100,
                l: 0.953,
            });
        for (const name of colors_js_1.COLOR_NAMES) {
            const value = branding.colors[name];
            if (!value)
                continue; // Skip missing colors
            const contrast = branding.colors[`${name}Contrast`] ??
                (0, color_js_1.pickContrastColor)(value, contrastLight, contrastDark);
            const hue = branding.colors[`${name}Hue`] ?? (0, color_js_1.extractHue)(value);
            yield `--branding-color-${name}: ${value.r} ${value.g} ${value.b};`;
            yield `--branding-color-${name}-contrast: ${contrast.r} ${contrast.g} ${contrast.b};`;
            yield `--branding-color-${name}-hue: ${hue};`;
        }
    }
}
//# sourceMappingURL=build-customization-css.js.map