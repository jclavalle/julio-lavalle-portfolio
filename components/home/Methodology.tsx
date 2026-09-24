"use client";

import { useEffect, useRef } from "react";
import { initMethodology } from "@/lib/methodology";
import { SNAPSHOT } from "@/content/methodology";

export default function Methodology() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return initMethodology(root.current);
  }, []);

  return (
    <section id="method" className="blk" ref={root}>
      <div className="wrap">
        <div className="top">
          <div className="figure" id="fig">
            <svg id="map" viewBox="30 38 680 692" role="group" aria-labelledby="map-title">
              <title id="map-title">
                Radial map of the methodology: eight layers from judgment at the core to compounding
                at the edge, with sources placed by layer and era.
              </title>
              <rect x="40" y="90" width="660" height="630" rx="9" fill="none" stroke="var(--ink)" strokeWidth="1.25" />
              <text className="cap-t" x="64" y="124">LOOP UNTIL VERIFIED</text>
              <text className="cap-t" x="64" y="142">GOAL · CRITERIA · COMPOUND</text>
              <rect x="64" y="156" width="108" height="56" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1.1" />
              <line x1="74" y1="182" x2="162" y2="182" stroke="var(--ink-2)" strokeWidth=".8" strokeDasharray="2 3" />
              <polyline points="74,204 86,166 98,196 110,174 122,188 134,179 146,183 162,182" fill="none" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M442 60 h12 v-13 h20 v13 h12" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
              <path d="M442 692 h12 v13 h20 v-13 h12" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
              <g id="band" />
              <g id="hls" />
              <g id="grid" />
              <g id="labels" />
              <g id="dots" />
              <circle id="selring" r="11" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="intro">
            <p className="eyebrow">{SNAPSHOT}</p>
            <h2 className="m-h">
              <span className="l1">Verification-driven</span>
              <span className="l2">product building</span>
            </h2>
            <p className="lede">
              How to build products with AI as of September 2026. Each dot is a source or signal from
              the research, placed on the layer it shapes and the era it came from. Select a dot to
              read it.
            </p>
            <p className="axes">
              <span>Ring = layer, inner → outer</span>
              <span>Angle = era, clockwise from oldest</span>
            </p>
            <div className="key">
              <span><i className="dotk" style={{ background: "var(--o-deep)" }} />Established canon</span>
              <span><i className="dotk" style={{ background: "var(--o-mid)" }} />Converging in 2026</span>
              <span><i className="dotk" style={{ background: "var(--o-pale)" }} />Emerging, Sep 2026</span>
            </div>

            <aside className="card card-sig" id="sig" aria-live="polite">
              <div className="row"><span className="k">Signal</span><span className="v" id="s-name" /></div>
              <div className="row"><span className="k">Layer</span><span className="v mono" id="s-ring" /></div>
              <div className="row">
                <span className="k">Durability</span>
                <span className="v mono"><i className="dotk" id="s-dot" /><span id="s-dur" /></span>
              </div>
              <div className="row"><span className="k">When</span><span className="v mono" id="s-when" /></div>
              <p className="note" id="s-note" />
              <div className="src" id="s-src" />
            </aside>

            <aside className="card card-nber">
              <div className="nb-head">
                <span className="nb-title">Judgment bottleneck</span>
                <span className="badge">NBER w35275</span>
              </div>
              <div className="lead-row"><span>Commits</span><i /><b>+240%</b></div>
              <div className="lead-row"><span>Projects</span><i /><b>+80%</b></div>
              <div className="lead-row"><span>Releases</span><i /><b>+30%</b></div>
              <p className="cap">Cumulative effect of autonomous coding agents</p>
            </aside>

            <p className="foot">
              This is a live synthesis of what I&apos;m hearing and reading about AI as it changes
              month to month. It&apos;s my personal synthesis, built on the sources I choose, and I
              update this chart every month.
            </p>
          </div>
        </div>

        <ol className="layers" id="legend" />
      </div>
    </section>
  );
}
