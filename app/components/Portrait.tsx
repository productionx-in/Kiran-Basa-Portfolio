"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "../lib/motion";

/**
 * The portrait slot.
 *
 * Every reference Kiran sent leads with a photograph of the person, and there
 * isn't one yet. Rather than leave a hole or fake a face, this renders a
 * composed frame that states what belongs here — and the moment
 * `/public/portrait.jpg` exists it is used instead, with no other change.
 *
 * The frame tilts a few degrees against the pointer, which is what stops a
 * static cut-out from looking pasted onto the page.
 */
export default function Portrait() {
  const box = useRef<HTMLDivElement>(null);
  const [has, setHas] = useState(false);

  useEffect(() => {
    // Ask for the file rather than assume; a 404 simply keeps the frame.
    const img = new window.Image();
    img.onload = () => setHas(true);
    img.src = "/portrait.jpg";
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || reduced() || !window.matchMedia("(hover: hover)").matches) return;
    const rx = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rx(nx * 7);
      ry(-ny * 5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="pt" ref={box}>
      {has ? (
        <Image src="/portrait.jpg" alt="Kiran Basa" fill sizes="(max-width:900px) 60vw, 26vw" className="pt__img" priority />
      ) : (
        <div className="pt__slot">
          <span className="pt__k">Portrait</span>
          <p className="pt__t">
            Drop a headshot at <code>/public/portrait.jpg</code> and it appears here.
          </p>
        </div>
      )}
    </div>
  );
}
