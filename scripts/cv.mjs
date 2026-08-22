/**
 * Renders /cv to a print-ready A4 PDF in /public.
 *
 * Run against a live server so the fonts, CSS and data are exactly what the web
 * page uses — no second template to keep in sync:
 *
 *   npm run build && npm start &   # or npm run dev
 *   npm run cv
 *
 * Chromium is expected at PLAYWRIGHT_BROWSERS_PATH or the system path; pass
 * CHROME_PATH to point at a specific binary.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.CV_URL ?? "http://127.0.0.1:3000/cv";

/** The name the file lands under in a recruiter's downloads folder. */
const OUT = join(root, "public", "Kiran-Basa-Creative-Head-CV.pdf");

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

const executablePath = CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium found. Set CHROME_PATH to a Chrome or Chromium binary.");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  // Webfonts land after networkidle often enough to be worth waiting on — a CV
  // rendered in the fallback stack looks like a different document entirely.
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
  });
  console.log(`Wrote ${OUT}`);
} catch (err) {
  console.error(`Failed against ${url} — is the dev/prod server running?`);
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
