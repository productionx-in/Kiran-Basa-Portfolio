/**
 * Renders the social share card to /public/og.jpg.
 *
 * A portfolio link gets pasted into LinkedIn messages and WhatsApp far more
 * often than it gets typed into a browser, and a link with no card attached
 * reads as an unfinished site. Built from the same profile data and the same
 * palette as the page, so it cannot drift from what the reader then sees.
 *
 *   npm run og
 */
import { chromium } from "playwright-core";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Pulled straight out of the TS source so there is one copy of each fact. */
const src = readFileSync(join(root, "app/data/profile.ts"), "utf8");
const pick = (k) => src.match(new RegExp(`${k}:\\s*"([^"]+)"`))?.[1] ?? "";

const name = pick("name");
const title = pick("title");
const subtitle = pick("subtitle");
const figures = [...src.matchAll(/\{ value: "([^"]+)", label: "([^"]+)"/g)].map((m) => ({
  v: m[1],
  l: m[2],
}));

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#faf8f5;color:#16151a;
       font-family:Inter,sans-serif;padding:72px 80px;display:flex;
       flex-direction:column;justify-content:space-between}
  .rule{width:64px;height:4px;background:#b0442a}
  h1{font-family:Fraunces,serif;font-weight:400;font-size:84px;line-height:1.02;letter-spacing:-0.02em}
  h1 span{color:#b0442a}
  .sub{font-size:22px;color:#45424b;margin-top:22px;max-width:44ch;line-height:1.45}
  .figs{display:flex;gap:56px;border-top:1px solid #e3ded6;padding-top:26px}
  .v{font-family:Fraunces,serif;font-size:40px;color:#b0442a;line-height:1}
  .l{font-size:15px;font-weight:600;margin-top:4px}
  .who{font-size:17px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:#706c76}
</style></head><body>
  <div>
    <div class="rule"></div>
    <div class="who" style="margin-top:18px">${name}</div>
    <h1 style="margin-top:14px">${title}.<br><span>${subtitle}</span></h1>
    <p class="sub">Ten years from edit suite to creative leadership — brand strategy, campaigns and production, owned end to end.</p>
  </div>
  <div class="figs">
    ${figures.map((f) => `<div><div class="v">${f.v}</div><div class="l">${f.l}</div></div>`).join("")}
  </div>
</body></html>`;

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);
const executablePath = CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium found. Set CHROME_PATH.");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const out = join(root, "public", "og.jpg");
await page.screenshot({ path: out, quality: 90, type: "jpeg" });
await browser.close();
console.log(`Wrote ${out}`);
