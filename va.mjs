import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:1440,height:950} });
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("response",r=>r.status()>=400&&errs.push(r.status()+" "+r.url().slice(0,60)));
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(3400);
await p.evaluate(()=>document.getElementById("work").scrollIntoView());
await p.waitForTimeout(1200);
await p.screenshot({path:"/tmp/a1.png"});

const rot1 = await p.$eval(".arc__wheel", e=>getComputedStyle(e).getPropertyValue("--rot"));
const act1 = await p.$eval(".arc__read h3", e=>e.textContent);
const cards = await p.$$eval(".arc__card", e=>e.length);
// each card must sit on the arc with its own transform
const tf = await p.$$eval(".arc__card", e=>e.slice(0,3).map(x=>getComputedStyle(x).transform.slice(0,34)));
console.log(`ARC cards=${cards} rot=${rot1.trim()} active="${act1}"`);
console.log("card transforms:", tf);

// drag the wheel
const box = await p.$eval(".arc__stage", e=>{const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});
await p.mouse.move(box.x, box.y); await p.mouse.down();
await p.mouse.move(box.x-420, box.y, {steps:20}); await p.mouse.up();
await p.waitForTimeout(700);
const rot2 = await p.$eval(".arc__wheel", e=>getComputedStyle(e).getPropertyValue("--rot"));
const act2 = await p.$eval(".arc__read h3", e=>e.textContent);
console.log(`AFTER DRAG rot=${rot2.trim()} active="${act2}" changed=${act1!==act2}`);
await p.screenshot({path:"/tmp/a2.png"});

// click a card
await p.click(".arc__card:nth-child(9)"); await p.waitForTimeout(900);
const act3 = await p.$eval(".arc__read h3", e=>e.textContent);
console.log(`AFTER CLICK active="${act3}"`);
await p.screenshot({path:"/tmp/a3.png"});
console.log("ERRORS:", errs.length?errs.slice(0,3):"none");

const m = await b.newPage({ viewport:{width:390,height:844} });
await m.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"}); await m.waitForTimeout(3300);
await m.evaluate(()=>document.getElementById("work").scrollIntoView()); await m.waitForTimeout(900);
await m.screenshot({path:"/tmp/a-m.png"});
console.log("mobile overflow:", await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await b.close();
