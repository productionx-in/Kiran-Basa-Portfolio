import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:390,height:844} });
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready);
const bad = await p.evaluate(()=>{
  const vw = document.documentElement.clientWidth;
  const out=[];
  document.querySelectorAll("*").forEach(el=>{
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      out.push({tag:el.tagName, cls:(el.className||"").toString().slice(0,45),
                left:Math.round(r.left), right:Math.round(r.right), w:Math.round(r.width)});
    }
  });
  return {vw, scrollW: document.documentElement.scrollWidth, offenders: out.slice(0,12)};
});
console.log("viewport:",bad.vw,"scrollWidth:",bad.scrollW);
console.table(bad.offenders);
await b.close();
