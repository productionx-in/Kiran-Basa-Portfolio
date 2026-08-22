import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:1440,height:950} });
await p.goto("http://127.0.0.1:3000/",{waitUntil:"networkidle"});
await p.evaluate(()=>document.fonts.ready);
const order=[];
for (let i=0;i<5;i++){
  await p.keyboard.press("Tab");
  order.push(await p.evaluate(()=>{
    const a=document.activeElement;
    return (a.className||a.tagName)+" :: "+(a.textContent||"").trim().slice(0,26);
  }));
}
console.log("TAB ORDER FROM FRESH LOAD:");
order.forEach((o,i)=>console.log(` ${i+1}. ${o}`));
// Is the skip link visible when focused?
await p.evaluate(()=>document.querySelector(".skip").focus());
const box = await p.$eval(".skip", e=>{const r=e.getBoundingClientRect();return {top:Math.round(r.top),visible:r.top>=0};});
console.log("skip link when focused:", JSON.stringify(box));
// No-JS check: does content survive?
const p2 = await b.newPage({ viewport:{width:1440,height:950}, javaScriptEnabled:false });
await p2.goto("http://127.0.0.1:3000/",{waitUntil:"domcontentloaded"});
const vis = await p2.evaluate(()=>{
  const h1=document.querySelector("h1"); const cs=getComputedStyle(h1);
  return {h1:h1.textContent.trim().slice(0,40), opacity:cs.opacity, cards:document.querySelectorAll(".card").length};
});
console.log("NO-JS:", JSON.stringify(vis));
await b.close();
