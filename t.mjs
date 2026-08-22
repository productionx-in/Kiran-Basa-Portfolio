import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:1440,height:950} });
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready);

// FILTER
const all = await p.$$eval(".card", e=>e.length);
await p.click('.chip:has-text("Digital")');
await p.waitForTimeout(300);
const digital = await p.$$eval(".card", e=>e.length);
const status = await p.textContent(".filter__status");
await p.click('.chip:has-text("Production")');
await p.waitForTimeout(300);
const prod = await p.$$eval(".card", e=>e.length);
console.log(`FILTER: all=${all} digital=${digital} production=${prod} | status="${status.trim()}"`);

// METHOD accordion
await p.click("#method .method__btn >> nth=0");
await p.waitForTimeout(250);
const open0 = await p.$eval("#method-0", e=>!e.hidden);
const exp0  = await p.$eval("#method .method__btn >> nth=0", e=>e.getAttribute("aria-expanded"));
await p.click("#method .method__btn >> nth=0");
await p.waitForTimeout(250);
const closed0 = await p.$eval("#method-0", e=>e.hidden);
console.log(`METHOD: opens=${open0} aria-expanded=${exp0} closes-again=${closed0}`);

// COUNTERS reached final values
const figs = await p.$$eval(".fig__v", e=>e.map(x=>x.textContent.trim()));
console.log("FIGURES:", figs.join(" | "));

// SCROLLSPY
await p.evaluate(()=>document.getElementById("experience").scrollIntoView({behavior:"instant"}));
await p.waitForTimeout(600);
const spy = await p.$$eval('.spy a[data-on="true"]', e=>e.map(x=>x.textContent.trim()));
console.log("SCROLLSPY active:", spy);

// EARLIER ROLES toggle both ways
await p.click('button[aria-controls="early-roles"]');
await p.waitForTimeout(300);
const shown = await p.$eval("#early-roles", e=>!e.hidden);
await p.click('button[aria-controls="early-roles"]');
await p.waitForTimeout(300);
const hidden = await p.$eval("#early-roles", e=>e.hidden);
console.log(`EARLIER ROLES: expands=${shown} collapses=${hidden}`);

// Keyboard: skip link is first focusable
await p.keyboard.press("Tab");
const first = await p.evaluate(()=>document.activeElement.className);
console.log("FIRST TAB STOP:", first);

console.log("JS ERRORS:", errs.length?errs.slice(0,3):"none");
await b.close();
