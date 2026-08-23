/**
 * Where the palette comes from.
 *
 * A portfolio's colours should be derived from the work rather than picked off
 * a trend board, so this script reads Kiran's own frames and reports what is
 * actually in them. It is committed so the reasoning stays checkable: run
 * `node scripts/palette.mjs` and the numbers it prints are the numbers in
 * `app/globals.css`.
 *
 * Three questions, in order:
 *
 *   1. How dark are the frames? That decides ground versus plate. Dark images
 *      on a dark page dissolve into it; on a light page they read as plates,
 *      which is the whole argument for a light ground behind this body of work.
 *   2. What are the shadows and highlights actually made of? Those become the
 *      ink and the paper, so the page is the same temperature as the images
 *      sitting on it instead of a neutral grey fighting them.
 *   3. What is the strongest recurring chroma? That is the only honest accent:
 *      a colour already in the work rather than one applied to it.
 *
 * Everything derived is then checked against WCAG AA, because a palette that
 * fails contrast is not a palette, it is a mood board.
 */
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../public/work/", import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith(".jpg")).sort();

/* ---- colour maths ------------------------------------------------------- */

const hex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const unhex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));

const lin = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : (c / 255 + 0.055) / 1.055 ** 1 ** 1) ;
/** WCAG relative luminance. Written out rather than golfed — it is load-bearing. */
function relLum([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const ratio = (a, b) => {
  const [x, y] = [relLum(a), relLum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

function toHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  if (!d) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function fromHsl([h, s, l]) {
  h = ((h % 360) + 360) % 360 / 360;
  if (!s) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const c = (t) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [c(h + 1 / 3) * 255, c(h) * 255, c(h - 1 / 3) * 255];
}

/** Darken a hue until it clears `target` contrast against `bg`. */
function darkenToPass(rgb, bg, target) {
  let [h, s, l] = toHsl(rgb);
  for (; l > 0.02; l -= 0.005) {
    const c = fromHsl([h, s, l]);
    if (ratio(c, bg) >= target) return c;
  }
  return fromHsl([h, s, 0.02]);
}

/* ---- read the frames ---------------------------------------------------- */

const px = [];            // every sampled pixel, for the shadow/highlight pass
const buckets = Array.from({ length: 24 }, () => ({ w: 0, r: 0, g: 0, b: 0, n: 0 }));
const perImage = [];

for (const f of files) {
  // 32×32 is enough: this asks what colour a frame is, not what is in it.
  const { data, info } = await sharp(dir + f)
    .resize(32, 32, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sum = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const rgb = [data[i], data[i + 1], data[i + 2]];
    const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    sum += lum; n++;
    px.push([lum, rgb]);

    const [h, s, l] = toHsl(rgb);
    // Near-grey and the extremes are hue noise, and greys are most of any photo.
    if (s < 0.25 || l < 0.12 || l > 0.9) continue;
    const k = Math.floor(h / 15) % 24;
    buckets[k].w += s; buckets[k].r += rgb[0]; buckets[k].g += rgb[1]; buckets[k].b += rgb[2]; buckets[k].n++;
  }
  perImage.push([f, Math.round(sum / n)]);
}

/* ---- 1. how dark is the work ------------------------------------------- */

console.log("1. Mean luminance per frame (0–255)\n");
for (const [f, l] of perImage) console.log(`   ${String(l).padStart(3)}  ${f}`);
const mean = Math.round(px.reduce((a, [l]) => a + l, 0) / px.length);
const dark = perImage.filter(([, l]) => l < 100).length;
console.log(`\n   mean ${mean}/255 across ${files.length} frames, ${dark} of ${files.length} below 100.`);
console.log(`   → ${mean < 110 ? "a dark body of work, so the page is light: the frames read as plates" : "a light body of work"}\n`);

/* ---- 2. shadows and highlights become ink and paper --------------------- */

px.sort((a, b) => a[0] - b[0]);
const avg = (arr) => [0, 1, 2].map((c) => arr.reduce((a, [, rgb]) => a + rgb[c], 0) / arr.length);
const shadow = avg(px.slice(0, Math.floor(px.length * 0.1)));
const highlight = avg(px.slice(-Math.floor(px.length * 0.05)));

// Keep the hue and saturation his frames actually have; move only the lightness
// to where a page needs it. That is what makes the page feel like the work.
const [sh, ss] = toHsl(shadow);
const [hh, hs] = toHsl(highlight);
const ink = fromHsl([sh, Math.min(ss, 0.14), 0.065]);
const paper = fromHsl([hh, Math.min(hs, 0.09), 0.905]);
// Secondary text keeps only a trace of the shadow's cast. At full saturation a
// 267° shadow reads visibly lavender in a paragraph, which is a photographic
// fact turned into a typographic mistake.
const muted = fromHsl([sh, Math.min(ss, 0.05), 0.33]);
const rule = fromHsl([hh, Math.min(hs, 0.05), 0.78]);

console.log("2. Shadows and highlights\n");
console.log(`   darkest 10%   ${hex(shadow)}  hue ${sh.toFixed(0)}°  → ink   ${hex(ink)}`);
console.log(`   lightest 5%   ${hex(highlight)}  hue ${hh.toFixed(0)}°  → paper ${hex(paper)}`);
console.log(`   → the page is the same temperature as the images on it\n`);

/* ---- 3. the accent ------------------------------------------------------ */

const top = buckets
  .map((b, i) => ({ ...b, hue: i * 15 }))
  .filter((b) => b.n)
  .sort((a, b) => b.w - a.w);

console.log("3. Dominant chroma, 15° buckets weighted by saturation\n");
for (const b of top.slice(0, 4)) {
  console.log(`   ${String(b.hue).padStart(3)}°–${String(b.hue + 15).padStart(3)}°  ${hex([b.r / b.n, b.g / b.n, b.b / b.n])}  weight ${b.w.toFixed(0)}`);
}

const win = top[0];
const raw = [win.r / win.n, win.g / win.n, win.b / win.n];
const [ah, as] = toHsl(raw);
// Saturate it into something that can carry a link and a rule, then darken it
// only as far as AA on the paper requires.
const accent = darkenToPass(fromHsl([ah, Math.max(as, 0.62), 0.42]), paper, 4.5);
console.log(`\n   strongest is ${win.hue}°–${win.hue + 15}° at ${hex(raw)} — pushed to a usable accent: ${hex(accent)}`);
console.log(`   → the accent is a colour already in the frames, not applied to them\n`);

/* ---- 4. does it pass ---------------------------------------------------- */

console.log("4. WCAG contrast on paper (AA body 4.5, AA large 3.0)\n");
const tokens = { ink, muted, accent, rule };
for (const [name, c] of Object.entries(tokens)) {
  const r = ratio(c, paper);
  const verdict = name === "rule" ? "(non-text)" : r >= 4.5 ? "AA" : r >= 3 ? "AA large only" : "FAIL";
  console.log(`   --${name.padEnd(7)} ${hex(c)}   ${r.toFixed(2)}  ${verdict}`);
}
console.log(`   --paper   ${hex(paper)}   on ink ${ratio(paper, ink).toFixed(2)}  AA`);
console.log(`   --paper   ${hex(paper)}   on accent ${ratio(paper, accent).toFixed(2)}  ${ratio(paper, accent) >= 4.5 ? "AA" : "AA large only"}`);

console.log("\nTokens\n");
for (const [name, c] of Object.entries({ paper, ink, muted, rule, accent })) {
  console.log(`  --${name}: ${hex(c)};`);
}
