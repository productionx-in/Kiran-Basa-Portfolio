import { chromium } from "playwright-core";
const URL = "https://id-preview--02d49094-3413-4e4b-8952-848fe2021002.lovable.app";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
try {
  await p.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: "/tmp/lov-top.png" });
  await p.evaluate(async()=>{const s=innerHeight*.5;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,140));}});
  await p.waitForTimeout(900);
  await p.evaluate(()=>scrollTo({top:0,behavior:"instant"}));
  await p.waitForTimeout(400);
  const h = await p.evaluate(()=>document.body.scrollHeight);
  console.log("page height:", h);
  await p.screenshot({ path: "/tmp/lov-full.png", fullPage: true });
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await m.waitForTimeout(1000);
  await m.screenshot({ path: "/tmp/lov-m.png" });
  console.log("ok");
} catch (e) { console.log("FAIL:", e.message.slice(0,200)); }
await b.close();
