/**
 * What this page has to survive, asserted rather than eyeballed.
 *
 * A portfolio is read once, often on someone else's machine, on a network you
 * do not control. So the guarantees below are not polish — they are the
 * difference between a hiring manager reading the work and closing the tab:
 *
 *   1. No JavaScript. Every project and every role must be there in full.
 *      Blocked bundles, corporate proxies and a bad train tunnel are all the
 *      same failure, and none of them should cost content.
 *   2. prefers-reduced-motion. Nothing may animate, and everything must still
 *      work — opening a row is behaviour, not decoration.
 *   3. A phone. Nothing may overflow the viewport.
 *   4. The interactions themselves: filters, panels, keyboard, anchors.
 *
 * Run against a built server:
 *   npm run build && npx next start -p 3000 &
 *   npm run verify                       # or VERIFY_URL=… npm run verify
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";

const URL = process.env.VERIFY_URL ?? "http://localhost:3000/";
const CHROME = [process.env.CHROME_PATH, "/opt/pw-browsers/chromium", "/usr/bin/chromium", "/usr/bin/google-chrome"]
  .filter(Boolean)
  .find((p) => existsSync(p));

if (!CHROME) {
  console.error("No Chromium found. Set CHROME_PATH.");
  process.exit(1);
}

let failures = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (!ok) failures++;
  console.log(`  ${ok ? "✓" : "✗"} ${label.padEnd(42)} ${String(got)}${ok ? "" : `  (expected ${want})`}`);
};

const browser = await chromium.launch({ executablePath: CHROME });

/* ---- 1. no JavaScript --------------------------------------------------- */
console.log("\nNo JavaScript");
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => {
    const visible = (el) => {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && +s.opacity > 0.01;
    };
    const panels = [...document.querySelectorAll(".row__panelIn, .job__panelIn")];
    return {
      text: document.body.innerText.length,
      curtains: [...document.querySelectorAll(".intro")].filter(visible).length,
      hidden: [...document.querySelectorAll("section, .step, .tool")].filter((e) => !visible(e)).length,
      collapsed: panels.filter((e) => e.getBoundingClientRect().height < 5).length,
      nameFilled: getComputedStyle(document.querySelector(".name__out")).backgroundSize,
    };
  });
  check("no curtain left over the page", r.curtains, 0);
  check("nothing hidden by a reveal", r.hidden, 0);
  check("no panel stuck shut", r.collapsed, 0);
  check("the name is solid, not hollow", r.nameFilled, "100% 100%");
  check("the whole document is readable", r.text > 12000, true);
  await ctx.close();
}

/* ---- 2. reduced motion -------------------------------------------------- */
console.log("\nprefers-reduced-motion");
{
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(1800);
  const r = await p.evaluate(() => ({
    motionOff: document.documentElement.classList.contains("motion-off"),
    cursor: document.querySelectorAll(".cur").length,
    faded: [...document.querySelectorAll(".js-reveal")].filter((e) => +getComputedStyle(e).opacity < 0.5).length,
    nameFilled: getComputedStyle(document.querySelector(".name__out")).backgroundSize,
  }));
  check("runtime stood down", r.motionOff, true);
  check("no custom cursor mounted", r.cursor, 0);
  check("nothing left faded out", r.faded, 0);
  check("the name is solid, not hollow", r.nameFilled, "100% 100%");
  await p.click(".row:nth-child(3) .row__btn");
  await p.waitForTimeout(300);
  check(
    "rows still open",
    await p.evaluate(() => document.querySelector(".row--open .row__panelIn")?.getBoundingClientRect().height > 100),
    true,
  );
  await ctx.close();
}

/* ---- 3. a phone --------------------------------------------------------- */
console.log("\nPhone, 390px");
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(2600);
  const r = await p.evaluate(() => {
    const bad = new Set();
    for (const el of document.querySelectorAll("body *")) {
      const box = el.getBoundingClientRect();
      // The marquee is deliberately wider than the screen and clips itself.
      if (!box.width || el.closest(".marq")) continue;
      if (box.right > innerWidth + 1.5 || box.left < -1.5) bad.add(`${el.tagName}.${el.className}`.slice(0, 60));
    }
    return { overflows: [...bad], sideways: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  check("nothing pokes out of the viewport", r.overflows.length, 0);
  if (r.overflows.length) console.log("      ", r.overflows.join("\n       "));
  check("the page does not scroll sideways", r.sideways, false);
  await ctx.close();
}

/* ---- 4. the interactions ------------------------------------------------ */
console.log("\nInteraction");
{
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  const count = (sel) => p.evaluate((s) => document.querySelectorAll(s).length, sel);

  check("every project listed", await count(".row"), 11);
  check("one project open on arrival", await count(".row--open"), 1);

  await p.click(".row:nth-child(5) .row__btn");
  await p.waitForTimeout(700);
  check("opening one closes the last", await count(".row--open"), 1);
  check("the clicked row is the open one", await p.evaluate(() => document.querySelector(".row--open .row__n").textContent), "05");
  check(
    "the open panel has real height",
    await p.evaluate(() => document.querySelector(".row--open .row__panelIn").getBoundingClientRect().height > 200),
    true,
  );

  await p.click('.chip:has-text("Web & Digital")');
  await p.waitForTimeout(900);
  check("filtering by craft", await count(".row"), 4);
  check("the count is announced", (await p.textContent(".sr[aria-live]")).includes("4 of 11"), true);

  await p.click('.chip:has-text("White-label")');
  await p.waitForTimeout(900);
  check("craft and engagement stack", await count(".row"), 1);

  await p.click(".filters__clear");
  await p.waitForTimeout(900);
  check("clearing restores every project", await count(".row"), 11);

  check("recent roles listed", await count(".job"), 4);
  await p.click(".more");
  await p.waitForTimeout(500);
  check("earlier roles unfold", await count(".job"), 8);

  await p.evaluate(() => document.querySelector(".row:nth-child(2) .row__btn").focus());
  await p.keyboard.press("Enter");
  await p.waitForTimeout(600);
  check(
    "a row opens from the keyboard",
    await p.evaluate(() => document.querySelector(".row:nth-child(2)").classList.contains("row--open")),
    true,
  );

  await p.click('.topbar__nav a[href="#method"]');
  await p.waitForTimeout(1400);
  check(
    "anchors land on their section",
    await p.evaluate(() => Math.abs(document.getElementById("method").getBoundingClientRect().top) < 160),
    true,
  );

  check("no errors thrown", errors.length, 0);
  if (errors.length) console.log("      ", errors.join("\n       "));
  await p.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed.\n` : "\nAll checks passed.\n");
process.exit(failures ? 1 : 0);
