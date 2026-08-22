import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
async function shot(w,h,out,full){
  const p = await b.newPage({ viewport:{width:w,height:h} });
  const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("response",r=>r.status()>=400&&errs.push(r.status()+" "+r.url()));
  await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
  await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(async()=>{const s=innerHeight*.5;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,110));}});
  await p.waitForTimeout(700);
  await p.evaluate(()=>scrollTo({top:0,behavior:"instant"})); await p.waitForTimeout(300);
  await p.screenshot({path:out, fullPage:full});
  const ov = await p.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
  console.log(out,"| overflow:",ov, errs.length?("| ERR "+errs.slice(0,3)):"");
  await p.close();
}
await shot(1440,950,"/tmp/v2-top.png",false);
await shot(1440,3200,"/tmp/v2-a.png",false);
await shot(390,844,"/tmp/v2-m.png",false);
await b.close();
