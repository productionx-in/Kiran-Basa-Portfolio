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

/**
 * The card is the page in miniature, and has to look like it: same derived
 * palette, same three type families, same index framing. A share card in a
 * different design from the site it links to reads as somebody else's link.
 */
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..700&family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  /* Tokens derived in scripts/palette.mjs — keep in step with app/globals.css. */
  body{width:1200px;height:630px;background:#e8e7e6;color:#100e13;
       font-family:"Inter Tight",sans-serif;padding:60px 72px;display:flex;
       flex-direction:column;justify-content:space-between}
  .top{display:flex;justify-content:space-between;align-items:baseline;
       border-bottom:1px solid #100e13;padding-bottom:14px}
  .mono{font-family:"IBM Plex Mono",monospace;font-size:15px;letter-spacing:.14em;
        text-transform:uppercase;color:#545058}
  .mono b{font-weight:500;color:#100e13}
  h1{font-family:"Newsreader",Georgia,serif;font-weight:700;font-size:132px;line-height:.84;
     letter-spacing:-.045em;text-transform:uppercase}
  h1 .o{color:transparent;-webkit-text-stroke:3px #100e13;
        background-image:linear-gradient(#ae2936,#ae2936);background-repeat:no-repeat;
        background-size:100% 100%;-webkit-background-clip:text;background-clip:text}
  .sub{font-family:"Newsreader",Georgia,serif;font-size:26px;color:#100e13;margin-top:26px;
       max-width:40ch;line-height:1.35}
  .figs{display:flex;gap:52px;border-top:1px solid #100e13;padding-top:22px}
  .v{font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:44px;line-height:1;
     letter-spacing:-.03em}
  .l{font-family:"IBM Plex Mono",monospace;font-size:13px;letter-spacing:.09em;
     text-transform:uppercase;color:#545058;margin-top:7px}
  .flag{background:#ae2936;color:#e8e7e6;padding:5px 11px;font-family:"IBM Plex Mono",monospace;
        font-size:13px;letter-spacing:.1em;text-transform:uppercase}
</style></head><body>
  <div>
    <div class="top">
      <span class="mono"><b>${name}</b> — ${title}</span>
      <span class="flag">Open to roles</span>
    </div>
    <h1 style="margin-top:34px">Kiran<br><span class="o">Basa</span></h1>
    <p class="sub">${subtitle}. Ten years from the edit suite to creative leadership.</p>
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
