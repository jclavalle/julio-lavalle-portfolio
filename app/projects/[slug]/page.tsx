import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import CaseStudyLayout from "@/components/case/CaseStudyLayout";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  if (frontmatter.layout === "case") {
    const sameTrack = getAllProjects().filter(
      (p) => p.frontmatter.track === frontmatter.track
    );
    const idx = sameTrack.findIndex((p) => p.slug === project.slug);
    const next = idx >= 0 ? sameTrack[idx + 1] ?? null : null;
    return <CaseStudyLayout project={project} next={next} />;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="font-mono text-sm text-muted hover:text-accent"
      >
        &larr; Back
      </Link>

      <header className="mb-10 mt-8">
        {frontmatter.status === "in-progress" && (
          <span className="mb-4 inline-block rounded border border-warm/40 px-2 py-1 font-mono text-xs text-warm">
            In progress
          </span>
        )}
        <h1 className="mb-3 font-serif text-3xl md:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mb-6 max-w-prose text-lg text-paper/90">
          {frontmatter.subtitle}
        </p>
        <dl className="grid max-w-md grid-cols-2 gap-y-1 font-mono text-sm text-muted">
          <dt>Org</dt>
          <dd className="text-paper/80">{frontmatter.org}</dd>
          <dt>Role</dt>
          <dd className="text-paper/80">{frontmatter.role}</dd>
          <dt>Period</dt>
          <dd className="text-paper/80">{frontmatter.period}</dd>
          {frontmatter.location && (
            <>
              <dt>Location</dt>
              <dd className="text-paper/80">{frontmatter.location}</dd>
            </>
          )}
        </dl>
      </header>

      {frontmatter.metrics && frontmatter.metrics.length > 0 && (
        <section className="mb-10 border-y border-rule py-4">
          <div className="grid gap-2">
            {frontmatter.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex justify-between gap-4 border-b border-rule/50 pb-2 font-mono text-sm last:border-b-0 last:pb-0"
              >
                <span className="text-muted">{metric.label}</span>
                <span className="tabular-nums text-paper">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <article className="prose-custom max-w-prose">
        <MDXRemote source={content} />
      </article>

      <div className="mt-10 flex flex-wrap gap-2">
        {frontmatter.stack.map((tag) => (
          <span
            key={tag}
            className="rounded border border-rule px-2 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {frontmatter.links && frontmatter.links.length > 0 && (
        <div className="mt-6 flex gap-6 font-mono text-sm">
          {frontmatter.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
