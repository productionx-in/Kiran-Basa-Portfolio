"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The three disciplines as oversized rows that open.
 *
 * Taken from the Ethan Brady reference: a stack of big condensed rows where
 * the engaged one inverts, fills with an image, and states its case. It works
 * here because Kiran's pitch is genuinely three things — the row list says
 * "three disciplines" at a glance, and opening one answers "can he actually
 * do that" without costing a page load.
 *
 * Hover opens on a pointer, click opens on touch and keyboard, and the whole
 * thing is a list of buttons so it is operable either way.
 */
type Row = { key: string; title: string; line: string; points: string[]; poster: string };

const ROWS: Row[] = [
  {
    key: "brand",
    title: "Brand & Strategy",
    line: "Where the brand stands, who it talks to, and how it stays in front of them.",
    points: [
      "Three brands built from nothing at Ujwala Group — identity, kit, campaign system",
      "Positioning, competitor study and a twelve-month roadmap",
      "Brand systems a team can actually hold to after I hand them over",
    ],
    poster: "/work/fashion.jpg",
  },
  {
    key: "production",
    title: "Content Production",
    line: "Ten years behind a camera and an edit timeline. It is why the strategy I write can be made.",
    points: [
      "Brand and ad films, concept through grade",
      "Product and fashion shoots, stills and motion off one day",
      "Multi-camera events and launches, delivered on the event's schedule",
    ],
    poster: "/work/event.jpg",
  },
  {
    key: "digital",
    title: "Digital & AI",
    line: "Where the audience lands, and how the work gets made when a camera cannot go.",
    points: [
      "Sites designed and built end to end, live for real clients",
      "Shopify storefronts — a 600+ SKU catalogue taken to launch",
      "Generated product, model and campaign imagery at commercial standard",
    ],
    poster: "/work/mahati.jpg",
  },
];

export default function Disciplines() {
  const [open, setOpen] = useState<string | null>("brand");

  return (
    <ul className="disc">
      {ROWS.map((r) => {
        const on = open === r.key;
        return (
          <li className="disc__row" key={r.key} data-on={on}>
            <button
              type="button"
              className="disc__btn"
              onPointerEnter={() => setOpen(r.key)}
              onFocus={() => setOpen(r.key)}
              onClick={() => setOpen(r.key)}
              aria-expanded={on}
              aria-controls={`disc-${r.key}`}
            >
              <span className="disc__title">{r.title}</span>
              <span className="disc__mark" aria-hidden="true" />
            </button>

            <div className="disc__panel" id={`disc-${r.key}`} hidden={!on}>
              <div className="disc__media">
                <Image src={r.poster} alt="" fill sizes="(max-width:900px) 100vw, 34vw" />
              </div>
              <div className="disc__body">
                <p className="disc__line">{r.line}</p>
                <ul className="disc__points">
                  {r.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
