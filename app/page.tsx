import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import LedgerStrip from "@/components/LedgerStrip";

// TODO: replace with your own verified headline numbers if these change,
// and update the contact links in the footer below.
const headlineMetrics = [
  { label: "Years building 0\u21921 products", value: "12+" },
  { label: "Annual transaction volume analyzed", value: "~$1B" },
  { label: "Nightly test failures reduced", value: "-50%" },
  { label: "LATAM markets scaled across", value: "5" },
];

export default function Home() {
  const projects = getAllProjects();
  const professional = projects.filter(
    (p) => p.frontmatter.track === "professional"
  );
  const builds = projects.filter((p) => p.frontmatter.track === "build");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-16">
        <p className="mb-4 font-mono text-sm text-muted">Julio Lavalle</p>
        <h1 className="mb-6 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          I build fintech and AI products end-to-end, from the first
          customer conversation to the production code.
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-paper/90">
          Former founder and product leader with 12+ years across the US
          and Latin America, now working at the technical edge of AI
          product: agents, evaluation, and reliability. This is a record
          of what I&apos;ve built, with the receipts.
        </p>
      </header>

      <section className="mb-20 border-y border-rule py-6">
        <LedgerStrip items={headlineMetrics} />
      </section>

      <section className="mb-20">
        <h2 className="mb-2 font-serif text-2xl">
          Product &amp; company leadership
        </h2>
        <p className="mb-8 max-w-prose text-muted">
          Founder work and product leadership across consumer fintech and
          financial infrastructure, plus the AI-native platform I most
          recently led product for.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {professional.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-2 font-serif text-2xl">
          Independent technical builds
        </h2>
        <p className="mb-8 max-w-prose text-muted">
          Self-directed projects, built to go hands-on with specific
          gaps &mdash; currently blockchain/stablecoin infrastructure and
          the open-source development lifecycle.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {builds.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* TODO: replace these three placeholder links with your real ones. */}
      <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-8 font-mono text-sm text-muted">
        <a href="mailto:you@example.com" className="hover:text-accent">
          Email
        </a>
        <a
          href="https://linkedin.com/in/your-handle"
          className="hover:text-accent"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/your-handle"
          className="hover:text-accent"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
