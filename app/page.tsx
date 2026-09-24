import Image from "next/image";
import "./home.css";
import { barlow, saira } from "./fonts";
import { getAllProjects } from "@/lib/projects";
import Gallery, { type GalleryItem } from "@/components/home/Gallery";
import Methodology from "@/components/home/Methodology";
import SectionNav from "@/components/home/SectionNav";

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
          Julio is building <em>AI-native</em> fintech products.
        </h1>
        <p className="status">Currently: shipping StableFlow · São Paulo, Brazil</p>
        <p className="bio">
          Former founder and product leader with 12+ years across the US and Latin America, now
          working at the technical edge of AI product: agents, evaluation, and reliability.
        </p>
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
                src="/julio-illustration.webp"
                width={1774}
                height={887}
                sizes="(max-width: 700px) 100vw, 380px"
                alt="Illustrated portrait of Julio Lavalle presenting product work"
              />
              <figcaption>[Draft illustration — style TBD]</figcaption>
            </figure>
            <div className="txt">
              <h2 className="h2">About</h2>
              <p>
                I&apos;m Julio Lavalle, a product leader and founder who spent 12+ years building
                fintech in the US and Latin America, and who now works at the technical edge of AI
                product: agents, evaluation, and reliability. This site is a record of what
                I&apos;ve built, with the receipts.
              </p>
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
