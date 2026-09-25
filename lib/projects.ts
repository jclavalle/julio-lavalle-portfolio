import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectMetric = { label: string; value: string };
export type ProjectLink = { label: string; href: string };

export type ProjectFrontmatter = {
  title: string;
  subtitle: string;
  // "professional": a real job / company you led product for.
  // "build": a self-directed project built to demonstrate something.
  track: "professional" | "build";
  org: string;
  role: string;
  period: string;
  location?: string;
  status: "live" | "in-progress";
  order?: number;
  // Optional: render the project with the wider visual case-study layout.
  layout?: "case";
  eyebrow?: string;
  pageTitle?: string;
  description?: string;
  tags?: string[];
  // Optional visual shown beside the hero text on wide screens.
  heroVisual?: "phone" | "conecta-phone" | "clade-flow";
  // Optional image shown on the homepage gallery card (falls back to a placeholder).
  cardImage?: string;
  cardImageAlt?: string;
  cardTag?: string;
  cardFit?: "contain";
  stack: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
};

/**
 * Every .mdx file in content/projects becomes a project automatically.
 * To add a new one: copy content/TEMPLATE.mdx into content/projects/,
 * fill it in, and it will appear here with no code changes.
 */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((filename) => filename.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  return projects.sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ProjectFrontmatter, content };
}
