import type { Metadata } from "next";
import Link from "next/link";
import "../home.css";
import { barlow, saira } from "../fonts";
import { CV } from "@/content/cv";
import SectionNav from "@/components/home/SectionNav";

export const metadata: Metadata = {
  title: "CV — Julio Lavalle",
  description: `${CV.headline}. ${CV.summary}`,
};

export default function CVPage() {
  return (
    <div className={`home ${saira.variable} ${barlow.variable}`}>
      <SectionNav current="/cv" />

      <main className="wrap cv-page">
        <div className="cv-head">
          <div>
            <p className="cv-eyebrow">Julio Lavalle · {CV.headline}</p>
            <h1 className="h2">Curriculum vitae</h1>
            <p className="cv-fmt">
              PDF · {CV.pages} pages · updated {CV.updated}
            </p>
          </div>
          <div className="cv-btns">
            <a
              className="cta ghost"
              href={CV.pdf}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="cv-open"
            >
              Open full PDF
            </a>
            <a className="cta solid" href={CV.pdf} download data-umami-event="cv-download">
              Download PDF
            </a>
          </div>
        </div>

        <div className="cv-card">
          <p className="cv-sum">{CV.summary}</p>

          <dl className="cv-kpis">
            {CV.metrics.map((m) => (
              <div key={m.label}>
                <dt>
                  {m.label}
                  <span className="cv-src">{m.source}</span>
                </dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="cv-cols">
            <div>
              <h2 className="cv-sec">Experience</h2>
              <ol className="cv-list">
                {CV.experience.map((j) => (
                  <li key={j.org}>
                    <div className="cv-row">
                      <span className="cv-t">
                        {j.role}, {j.org}
                      </span>
                      <span className="cv-d">{j.period}</span>
                    </div>
                    <p className="cv-n">{j.note}</p>
                    {j.caseStudy && (
                      <Link
                        className="cv-case"
                        href={`/projects/${j.caseStudy}`}
                        data-umami-event={`cv-case-${j.caseStudy}`}
                      >
                        Read the case study →
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
              <p className="cv-more">{CV.earlier}</p>
            </div>

            <div>
              <h2 className="cv-sec">Education</h2>
              <ol className="cv-list">
                {CV.education.map((e) => (
                  <li key={e.degree}>
                    <div className="cv-row">
                      <span className="cv-t">{e.degree}</span>
                      <span className="cv-d">{e.period}</span>
                    </div>
                    <p className="cv-n">{e.school}</p>
                  </li>
                ))}
              </ol>

              <h2 className="cv-sec">Skills</h2>
              <ul className="cv-chips">
                {CV.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="cv-back">
          <Link className="clink" href="/#work">
            See all selected work
          </Link>
          {" · "}
          <a className="clink" href="mailto:jlavalle@usp.br" data-umami-event="cv-email">
            jlavalle@usp.br
          </a>
        </p>
      </main>

      <div className="wrap">
        <div className="foot-end">© 2026 Julio Lavalle</div>
      </div>
    </div>
  );
}
