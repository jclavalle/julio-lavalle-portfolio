import Image from "next/image";
import "./home.css";
import { barlow, saira } from "./fonts";
import { getAllProjects } from "@/lib/projects";
import Gallery, { type GalleryItem } from "@/components/home/Gallery";
import Methodology from "@/components/home/Methodology";
import SectionNav from "@/components/home/SectionNav";

// Link for the word "Halcyon" in the About caption. Leave empty to show plain text.
const HALCYON_URL = "https://halcyonaccelerator.org/founder/julio-lavalle/";

const SKILLS = [
  {
    title: "Product",
    text: "0→1 strategy, roadmapping, and the judgment calls that decide what not to build.",
  },
  {
    title: "AI & Data",
    text: "Agent design, evaluation harnesses, reliability guardrails, production ML systems.",
  },
  {
    title: "Fintech",
    text: "Open finance, embedded lending, cross-border payments, regulatory-aware product.",
  },
  {
    title: "Tools",
    text: "Next.js, TypeScript, Python, CI/CD, the full PR-based development lifecycle.",
  },
];

function galleryItems(): GalleryItem[] {
  const all = getAllProjects();
  const ordered = [
    ...all.filter((p) => p.frontmatter.track === "professional"),
    ...all.filter((p) => p.frontmatter.track === "build"),
  ];
  return ordered.map(({ slug, frontmatter: f }) => {
    const professional = f.track === "professional";
    const inProgress = f.status === "in-progress";
    return {
      slug,
      title: f.title,
      description: professional ? `${f.org} — ${f.subtitle}` : f.subtitle,
      date: professional ? f.period : `${f.period} · ${f.org}`,
      tag: inProgress ? "In progress" : professional ? "Leadership" : "Build",
      inProgress,
    };
  });
}

export default function Home() {
  const items = galleryItems();

  return (
    <div className={`home ${saira.variable} ${barlow.variable}`}>
      <SectionNav />

      <header className="wrap hero" id="top">
        <p className="who">Julio Lavalle</p>
        <h1>
          Product leader &amp; founder building <em>AI-native</em> products.
        </h1>
        <p className="bio">
          10+ years building and scaling products, from founding 3 fintech companies across Latin
          America to leading AI-native enterprise products and shipping alongside engineering
          globally.
        </p>
        <div className="cta-row">
          <a className="cta" href="#work">
            View selected work
          </a>
        </div>
        <p className="status">Currently building StableFlow · Rio de Janeiro, Brazil</p>
      </header>

      <Methodology />

      <section id="work" className="blk">
        <div className="wrap">
          <Gallery items={items} />
        </div>
      </section>

      <section id="skills" className="blk">
        <div className="wrap">
          <h2 className="h2">What I bring</h2>
          <div className="skills">
            {SKILLS.map((s) => (
              <div className="skill" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="blk">
        <div className="wrap">
          <div className="about">
            <figure>
              <Image
                src="/julio-halcyon.webp"
                width={1448}
                height={1086}
                sizes="(max-width: 860px) 100vw, 460px"
                alt="Illustration of Julio pitching product screens on stage"
              />
              <figcaption>
                AI reinterpretation of an investor pitch at{" "}
                {HALCYON_URL ? (
                  <a className="clink" href={HALCYON_URL} target="_blank" rel="noopener noreferrer">
                    Halcyon
                  </a>
                ) : (
                  "Halcyon"
                )}
                , Washington, DC, during my founder years.
              </figcaption>
            </figure>
            <div className="txt">
              <p className="label">About</p>
              <h2>
                I started as a founder.
                <br />
                That&apos;s still how I approach product.
              </h2>
              <p className="copy">
                Building MiBolsillo from zero and scaling it across Latin America shaped how I work
                today: close to customers, comfortable with ambiguity, and willing to move between
                strategy and technical execution. Since then, I&apos;ve built Open Finance
                infrastructure at Conecta Pro and AI-native products at Clade. Today, I&apos;m
                particularly interested in the increasingly blurry boundary between product and
                engineering &mdash; and how AI enables small, strong teams to build and ship things
                that previously required much larger organizations.
              </p>
              <p className="where">Based in Rio de Janeiro · Built across LATAM · Worked globally</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="blk">
        <div className="wrap">
          <h2 className="h2">Let&apos;s talk</h2>
          <div className="contact">
            <div>
              <span>Email</span>
              <a className="clink" href="mailto:jlavalle@usp.br">
                jlavalle@usp.br
              </a>
            </div>
            <div>
              <span>LinkedIn</span>
              <a
                className="clink"
                href="https://www.linkedin.com/in/juliolavalle/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/juliolavalle
              </a>
            </div>
            <div>
              <span>GitHub</span>
              <a
                className="clink"
                href="https://github.com/jclavalle"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/jclavalle
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="foot-end">© 2026 Julio Lavalle</div>
      </div>
    </div>
  );
}
