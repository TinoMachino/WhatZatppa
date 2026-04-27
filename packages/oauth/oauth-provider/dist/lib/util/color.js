"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColor = parseColor;
exports.parseHexColor = parseHexColor;
exports.parseRgbColor = parseRgbColor;
exports.parseRgbaColor = parseRgbaColor;
exports.pickContrastColor = pickContrastColor;
exports.hslToRgb = hslToRgb;
exports.extractHue = extractHue;
const ui8_js_1 = require("./ui8.js");
function parseColor(color) {
    if (color.startsWith('#')) {
        return parseHexColor(color);
    }
    if (color.startsWith('rgba(')) {
        return parseRgbaColor(color);
    }
    if (color.startsWith('rgb(')) {
        return parseRgbColor(color);
    }
    // Should never happen (as long as the input is a validated WebColor)
    throw new TypeError(`Invalid color value: ${color}`);
}
function parseHexColor(v) {
    // parseInt('az', 16) does not return NaN so we need to check the format
    if (!/^#[0-9a-f]+$/i.test(v)) {
        throw new TypeError(`Invalid hex color value: ${v}`);
    }
    if (v.length === 4 || v.length === 5) {
        const r = (0, ui8_js_1.parseUi8Hex)(v[1].repeat(2));
        const g = (0, ui8_js_1.parseUi8Hex)(v[2].repeat(2));
        const b = (0, ui8_js_1.parseUi8Hex)(v[3].repeat(2));
        const a = v.length > 4 ? (0, ui8_js_1.parseUi8Hex)(v[4].repeat(2)) : undefined;
        return a == null ? { r, g, b } : { r, g, b, a };
    }
    if (v.length === 7 || v.length === 9) {
        const r = (0, ui8_js_1.parseUi8Hex)(v.slice(1, 3));
        const g = (0, ui8_js_1.parseUi8Hex)(v.slice(3, 5));
        const b = (0, ui8_js_1.parseUi8Hex)(v.slice(5, 7));
        const a = v.length > 8 ? (0, ui8_js_1.parseUi8Hex)(v.slice(7, 9)) : undefined;
        return a == null ? { r, g, b } : { r, g, b, a };
    }
    throw new TypeError(`Invalid hex color value: ${v}`);
}
function parseRgbColor(v) {
    const matches = v.match(/^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/);
    if (!matches)
        throw new TypeError(`Invalid rgb color value: ${v}`);
    const r = (0, ui8_js_1.parseUi8Dec)(matches[1]);
    const g = (0, ui8_js_1.parseUi8Dec)(matches[2]);
    const b = (0, ui8_js_1.parseUi8Dec)(matches[3]);
    return { r, g, b };
}
function parseRgbaColor(v) {
    const matches = v.match(/^\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/);
    if (!matches)
        throw new TypeError(`Invalid rgba color value: ${v}`);
    const r = (0, ui8_js_1.parseUi8Dec)(matches[1]);
    const g = (0, ui8_js_1.parseUi8Dec)(matches[2]);
    const b = (0, ui8_js_1.parseUi8Dec)(matches[3]);
    const a = (0, ui8_js_1.parseUi8Dec)(matches[4]);
    return { r, g, b, a };
}
/**
 * Return the color that has the best contrast with the reference color.
 */
function pickContrastColor(ref, a, b) {
    return computeContrastRatio(ref, a) > computeContrastRatio(ref, b) ? a : b;
}
function hslToRgb(input) {
    const { h, s, l } = input;
    // Achromatic (gray)
    if (s === 0) {
        const gray = Math.round(l * 255);
        return 'a' in input
            ? { r: gray, g: gray, b: gray, a: input.a }
            : { r: gray, g: gray, b: gray };
    }
    const hueToRgb = (p, q, t) => {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hNorm = h / 360;
    const r = Math.round(hueToRgb(p, q, hNorm + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, hNorm) * 255);
    const b = Math.round(hueToRgb(p, q, hNorm - 1 / 3) * 255);
    return 'a' in input ? { r, g, b, a: input.a } : { r, g, b };
}
/**
 * @see {@link https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef}
 */
function relativeLuminance(color) {
    const { r, g, b } = 'h' in color ? hslToRgb(color) : color;
    return rgbLum(r) * 0.2126 + rgbLum(g) * 0.7152 + rgbLum(b) * 0.0722;
}
function rgbLum(value) {
    const rgb = value / 255;
    return rgb < 0.03928 ? rgb / 12.92 : Math.pow((rgb + 0.055) / 1.055, 2.4);
}
/**
 * @see {@link https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef}
 */
function computeContrastRatio(a, b) {
    const aLum = relativeLuminance(a);
    const bLum = relativeLuminance(b);
    const [lighter, darker] = aLum > bLum ? [aLum, bLum] : [bLum, aLum];
    return (lighter + 0.05) / (darker + 0.05);
}
function extractHue(input) {
    const r = input.r / 255;
    const g = input.g / 255;
    const b = input.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    switch (max) {
        case min:
            return 0; // Achromatic
        case r: {
            const segment = (g - b) / chroma;
            const shift = segment < 0 ? 360 / 60 : 0 / 60;
            return 60 * (segment + shift);
        }
        case g: {
            const segment = (b - r) / chroma;
            const shift = 120 / 60;
            return 60 * (segment + shift);
        }
        // "default" needed for type safety. In practice, should be same as "case b:"
        default: {
            const segment = (r - g) / chroma;
            const shift = 240 / 60;
            return 60 * (segment + shift);
        }
    }
}
//# sourceMappingURL=color.js.map