"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorsSchema = exports.COLOR_NAMES = void 0;
const zod_1 = require("zod");
const color_hue_js_1 = require("../types/color-hue.js");
const rgb_color_js_1 = require("../types/rgb-color.js");
exports.COLOR_NAMES = [
    'primary',
    'error',
    'warning',
    'info',
    'success',
];
exports.colorsSchema = zod_1.z
    .object({
    // The "light" and "dark" colors are used as default for unspecified
    // contrast colors. The color that has the highest contrast ratio with the
    // color base will be used. e.G. If "primary" is specified but
    // "primaryContrast" is not, then the contrast color will be either "light"
    // or "dark" depending on which one has the highest contrast ratio with
    // "primary".
    light: rgb_color_js_1.rgbColorSchema.optional(),
    dark: rgb_color_js_1.rgbColorSchema.optional(),
    // The "contrastSaturation" is used to compute the saturation of the
    // "contrast" color. The "contrast" color is a (dynamic) color derived from
    // the "primaryHue" color with the specified saturation and a variable
    // lightness. "color-contrast-900" is used for default text, while
    // "color-contrast-0" is used for the page background.
    contrastSaturation: zod_1.z.number().min(0).max(100).optional(),
})
    .extend(Object.fromEntries(exports.COLOR_NAMES.map((name) => [name, rgb_color_js_1.rgbColorSchema.optional()])))
    .extend(Object.fromEntries(exports.COLOR_NAMES.map((name) => [`${name}Contrast`, rgb_color_js_1.rgbColorSchema.optional()])))
    .extend(Object.fromEntries(exports.COLOR_NAMES.map((name) => [`${name}Hue`, color_hue_js_1.colorHueSchema.optional()])));
//# sourceMappingURL=colors.js.map