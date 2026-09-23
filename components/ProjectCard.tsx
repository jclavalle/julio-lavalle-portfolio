import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="block border border-rule rounded p-5 transition-colors hover:border-accent"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl leading-snug text-paper">
          {frontmatter.title}
        </h3>
        {frontmatter.status === "in-progress" && (
          <span className="shrink-0 font-mono text-xs text-warm">
            In progress
          </span>
        )}
      </div>
      <p className="mb-4 text-paper/80">{frontmatter.subtitle}</p>
      <p className="font-mono text-xs text-muted">{frontmatter.org}</p>
      <p className="font-mono text-xs text-muted">{frontmatter.period}</p>
    </Link>
  );
}
