import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Project } from "@/lib/projects";
import { barlow, saira } from "@/app/fonts";
import HeroVisual from "./HeroVisual";
import ConectaHeroPhone from "./ConectaHeroPhone";
import { E2EPipeline } from "./Mockups";
import ZoomFigure from "./ZoomFigure";
import { Callout, CladeHeroFlow, Flow, Principles } from "./CladeBlocks";
import StepRow from "./StepRow";
import PhoneJourney from "./PhoneJourney";
import PlatformDiagram from "./PlatformDiagram";
import UseCases from "./UseCases";
import Journey from "./Journey";
import ProductModel from "./ProductModel";
import Evolution from "./Evolution";
import WhiteLabel from "./WhiteLabel";
import { Bridge, Lessons, Note, Outcomes, Owned } from "./Blocks";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mb-5 mt-24 max-w-2xl font-display text-2xl font-medium leading-[1.1] tracking-tight text-paper md:text-4xl"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 max-w-prose text-base leading-relaxed text-paper/90 md:text-lg" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => <a className="text-accent hover:underline" {...props} />,
  HeroVisual,
  StepRow,
  PhoneJourney,
  PlatformDiagram,
  UseCases,
  Journey,
  ProductModel,
  Evolution,
  WhiteLabel,
  Owned,
  Outcomes,
  Bridge,
  Lessons,
  Note,
  Flow,
  Principles,
  Callout,
  E2EPipeline,
  ZoomFigure,
};

export default function CaseStudyLayout({
  project,
  next,
}: {
  project: Project;
  next: Project | null;
}) {
  const { frontmatter: f, content } = project;
  const landscape = f.heroVisual === "clade-flow";

  return (
    <main className={`${saira.variable} ${barlow.variable} mx-auto max-w-5xl px-6 py-16 font-body md:py-24`}>
      <Link href="/" className="font-mono text-sm text-muted hover:text-accent">
        &larr; Back
      </Link>

      <header
        className={
          landscape
            ? "mb-4 mt-8 grid gap-y-0 lg:mr-[calc(-1*clamp(0px,(100vw-1040px)/2,8rem))] lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-x-12"
            : "mb-4 mt-8 grid gap-y-0 lg:mr-[calc(-1*clamp(0px,(100vw-1040px)/2,8rem))] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-14"
        }
      >
        <div className="lg:col-start-1 lg:row-start-1">
          {f.eyebrow && <p className="mb-4 font-mono text-xs tracking-widest text-accent">{f.eyebrow}</p>}
          <h1 className="mb-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] md:text-6xl">
            {f.pageTitle ?? f.title}
          </h1>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-paper/90">
            {f.description ?? f.subtitle}
          </p>
          {f.tags && <p className="mb-3 font-mono text-sm text-muted">{f.tags.join(" · ")}</p>}
          <p className="font-mono text-sm text-muted">
            <span className="text-paper/80">{f.role}</span>
            {" · "}
            {f.period}
            {f.location ? ` · ${f.location}` : ""}
          </p>
        </div>
        {f.heroVisual && (
          <div
            className={
              landscape
                ? "mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:self-start"
                : "mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:-mb-[100px] lg:mt-8 lg:self-start"
            }
          >
            {f.heroVisual === "clade-flow" ? (
              <CladeHeroFlow />
            ) : f.heroVisual === "conecta-phone" ? (
              <ConectaHeroPhone />
            ) : (
              <HeroVisual />
            )}
          </div>
        )}
      </header>

      <article>
        <MDXRemote source={content} components={components} options={{ blockJS: false }} />
      </article>

      {next && (
        <nav className="mt-28 border-t border-rule pt-8" aria-label="Next project">
          <p className="mb-2 font-mono text-xs tracking-widest text-muted">NEXT PROJECT</p>
          <Link href={`/projects/${next.slug}`} className="group inline-block">
            <span className="font-display text-2xl font-medium text-paper group-hover:text-accent md:text-3xl">
              {next.frontmatter.title}
            </span>
            <span className="mt-1 block font-mono text-xs text-muted">
              {next.frontmatter.org} · {next.frontmatter.period}
            </span>
          </Link>
        </nav>
      )}
    </main>
  );
}
