import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:1440,height:950} });
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("response",r=>r.status()>=400&&errs.push(r.status()+" "+r.url().slice(0,70)));
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(3400);
await p.evaluate(()=>document.getElementById("work").scrollIntoView());
await p.waitForTimeout(1000);
await p.screenshot({path:"/tmp/s1.png"});
const idx1 = await p.$eval(".sc__now", e=>e.textContent);
const clip1 = await p.$eval(".sc__panel[data-i='1'] .sc__media", e=>getComputedStyle(e).clipPath);
for (let k=0;k<4;k++){ await p.mouse.wheel(0,1400); await p.waitForTimeout(750); }
await p.screenshot({path:"/tmp/s2.png"});
const idx2 = await p.$eval(".sc__now", e=>e.textContent);
const fill = await p.$eval(".sc__rule span", e=>e.style.transform);
console.log(`INDEX ${idx1} -> ${idx2} | advanced=${idx1!==idx2} | progress=${fill}`);
console.log("mask reveal ran:", clip1 !== "none");
// the previz card with no image
const none = await p.$$eval(".sc__media--none .sc__none-t", e=>e.map(x=>x.textContent));
console.log("no-image panels:", none);
// links
const links = await p.$$eval(".sc__link", e=>e.map(x=>x.textContent.trim()+" -> "+x.getAttribute("href")));
console.log("links:", links);
console.log("ERRORS:", errs.length?errs.slice(0,4):"none");
const m = await b.newPage({ viewport:{width:390,height:844} });
await m.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"}); await m.waitForTimeout(3300);
await m.evaluate(()=>document.getElementById("work").scrollIntoView()); await m.waitForTimeout(900);
await m.screenshot({path:"/tmp/s-m.png"});
console.log("mobile overflow:", await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await b.close();
