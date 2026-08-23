import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:1440,height:950} });
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(3400);
await p.evaluate(()=>document.getElementById("work").scrollIntoView()); await p.waitForTimeout(1200);
// bring the type tile to the top so it can be inspected
const idx = await p.$$eval(".arc__card", els => els.findIndex(e=>e.querySelector(".arc__none")));
await p.click(`.arc__card:nth-child(${idx+1})`); await p.waitForTimeout(1000);
await p.screenshot({path:"/tmp/b-tile.png"});
console.log("type-tile card index:", idx, "| active:", await p.$eval(".arc__read h3", e=>e.textContent));
// full section
await p.evaluate(()=>document.getElementById("work").scrollIntoView()); await p.waitForTimeout(900);
await p.screenshot({path:"/tmp/b-arc.png"});
// reduced motion fallback
const r = await b.newPage({ viewport:{width:1440,height:950} });
await r.emulateMedia({reducedMotion:"reduce"});
await r.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"}); await r.waitForTimeout(1200);
console.log("REDUCED:", JSON.stringify(await r.evaluate(()=>({
  motionOff: document.documentElement.className.includes("motion-off"),
  cards: document.querySelectorAll(".arc__card").length,
  stageOverflow: getComputedStyle(document.querySelector(".arc__stage")).overflowX,
  readable: document.querySelector(".arc__read h3").textContent.slice(0,30),
}))));
console.log("ERRORS:", errs.length?errs.slice(0,3):"none");
const m = await b.newPage({ viewport:{width:390,height:844} });
await m.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"}); await m.waitForTimeout(3300);
await m.evaluate(()=>document.getElementById("work").scrollIntoView()); await m.waitForTimeout(900);
await m.screenshot({path:"/tmp/b-m.png"});
console.log("mobile overflow:", await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await b.close();
