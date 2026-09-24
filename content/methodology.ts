// Monthly-updated synthesis behind the methodology map.
// To update: edit SIGNALS (add, change, or remove entries). Each signal carries its own source.
// ring = layer 1-8 (see RINGS); date = decimal year (2026.5 = mid-2026);
// status: "e" established, "c" converging, "m" emerging (unproven).

export type Status = "e" | "c" | "m";

export type Source = {
  type: string;
  cite: string;
  url: string | null;
};

export type Signal = {
  name: string;
  ring: number;
  date: number;
  status: Status;
  when: string;
  note: string;
  source: Source;
};

export type Ring = { name: string; label: string; desc: string };

export type Era = {
  a: number;
  b: number;
  lo: number;
  hi: number;
  label: string;
  e1: number;
  e2: number;
};

export const SNAPSHOT = "Snapshot · 23 Sep 2026";

export const RINGS: Ring[] = [
  { name: "Judgment", label: "JUDGMENT", desc: "Humans own understanding, taste and accountability, including what agents write to memory." },
  { name: "Discovery", label: "DISCOVERY", desc: "Real customer problems and target outcomes. AI cuts the cost of building, not the need to learn." },
  { name: "Prototype + spec", label: "PROTOTYPE + SPEC", desc: "Show with demos, not documents. Specs stay the source of truth for agents." },
  { name: "Goals + evals", label: "GOALS + EVALS", desc: "Goals with checkable success criteria. Evals become the loops agents run on." },
  { name: "Orchestration", label: "ORCHESTRATION", desc: "One simple surface with smart defaults; a coordinator routes the sub-agents." },
  { name: "Economics", label: "ECONOMICS", desc: "Measure quality and cost per task together, and match each model to the task." },
  { name: "Humans + agents", label: "HUMANS + AGENTS", desc: "Design for two kinds of user, and choose a stance: open, block or charge." },
  { name: "Compound + re-test", label: "COMPOUND + RE-TEST", desc: "Feed every lesson back; re-test with each model, and hedge if the frontier slows." },
];

export const ERAS: Era[] = [
  { a: -142, b: -97, lo: 0, hi: 2024, label: "CANON · ≤ 2023", e1: -145, e2: -92.5 },
  { a: -88, b: -17, lo: 2024, hi: 2026, label: "2024 – 25", e1: -92.5, e2: -12.5 },
  { a: -8, b: 74, lo: 2026, hi: 2026.6, label: "H1 2026 · AGENTIC ENGINEERING", e1: -12.5, e2: 79 },
  { a: 84, b: 140, lo: 2026.6, hi: 2100, label: "SEPTEMBER 2026 SIGNALS", e1: 79, e2: 145 },
];

export const SIGNALS: Signal[] = [
  {
    name: "Jagged frontier — Ethan Mollick",
    ring: 1,
    date: 2024.3,
    status: "e",
    when: "2024 · Co-Intelligence",
    note: "Models fail unpredictably on easy-looking tasks, so a human stays accountable.",
    source: { type: "Book", cite: "Ethan Mollick, Co-Intelligence (2024)", url: "https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/059371671X" },
  },
  {
    name: "\"Outsource your thinking, not your understanding\" — Andrej Karpathy",
    ring: 1,
    date: 2026.33,
    status: "c",
    when: "Apr 2026 · Sequoia Ascent",
    note: "Understanding, taste and system design stay human.",
    source: { type: "Talk", cite: "Andrej Karpathy, Sequoia AI Ascent 2026 (his own summary)", url: "https://karpathy.bearblog.dev/sequoia-ascent-2026/" },
  },
  {
    name: "Amplify thinking, don’t abdicate it — Marty Cagan",
    ring: 1,
    date: 2026.31,
    status: "c",
    when: "Apr 2026 · SVPG talk",
    note: "Neither process nor AI is a substitute for product thinking.",
    source: { type: "Talk", cite: "Marty Cagan, SVPG talk, Apr 2026 (third-party notes)", url: "https://visitmy.website/2026/04/24/marty-cagans-new-standard-for-product-in-the-age-of-ai/" },
  },
  {
    name: "Taste is the new bottleneck — several essayists",
    ring: 1,
    date: 2026.4,
    status: "c",
    when: "Feb–Jun 2026",
    note: "When building is cheap, choosing what to build gets expensive.",
    source: { type: "Article", cite: "Several essayists, Feb–Jun 2026", url: null },
  },
  {
    name: "\"Humans are responsible, not the AI\" — Scott Bessent",
    ring: 1,
    date: 2026.715,
    status: "m",
    when: "Sep 2026 · CNBC",
    note: "Liability for agent actions is moving onto the companies that ship them.",
    source: { type: "Interview", cite: "Scott Bessent, CNBC Squawk Box, 21 Sep 2026", url: "https://www.cnbc.com/2026/09/21/treasury-bessent-cnbc-squawk-trump-bond-affordabilty.html" },
  },
  {
    name: "Misalignment disclosure framework — OpenAI",
    ring: 1,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "Models wrote instructions into their own compaction summaries. Review memory, not just outputs.",
    source: { type: "Report", cite: "OpenAI, Our framework for reporting model misalignment, 16 Sep 2026", url: "https://openai.com/index/model-misalignment-reporting-framework/" },
  },
  {
    name: "Continuous Discovery Habits — Teresa Torres",
    ring: 2,
    date: 2021.4,
    status: "e",
    when: "2021",
    note: "Weekly customer contact and opportunity mapping, aimed at outcomes.",
    source: { type: "Book", cite: "Teresa Torres, Continuous Discovery Habits (2021)", url: "https://www.producttalk.org/continuous-discovery-habits/" },
  },
  {
    name: "The product model — Marty Cagan",
    ring: 2,
    date: 2023.9,
    status: "e",
    when: "2017–2024 · Inspired to Transformed",
    note: "Empowered teams own outcomes, not a feature backlog.",
    source: { type: "Book", cite: "Marty Cagan, Transformed: Moving to the Product Operating Model", url: "https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/" },
  },
  {
    name: "Evals as \"a new discovery habit\" — Teresa Torres",
    ring: 2,
    date: 2026.2,
    status: "c",
    when: "2026 · Product Talk",
    note: "She spent more time building evals than building her AI Interview Coach.",
    source: { type: "Article", cite: "Teresa Torres, Product Talk: Building AI Evals for the Interview Coach", url: "https://www.producttalk.org/interview-coach-evals-q-a/" },
  },
  {
    name: "The blank text box problem — Greg Brockman",
    ring: 2,
    date: 2026.705,
    status: "m",
    when: "Sep 2026 · podcast",
    note: "Most people don’t know what to ask. Agents should propose tasks from context.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 17 Sep 2026: Why Everyone Is Getting Excited About Personal AI Agents", url: "https://aidailybrief.ai/e/2026-09-17" },
  },
  {
    name: "Agentic-shopping skeptics — Ron Johnson, Adam Foroughi",
    ring: 2,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "Browsing is part of the value. Don’t automate away what users enjoy.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 22 Sep 2026: Agent Wars!", url: "https://aidailybrief.ai/e/2026-09-22" },
  },
  {
    name: "Spec-driven development — GitHub Spec Kit, AWS Kiro",
    ring: 3,
    date: 2025.7,
    status: "c",
    when: "2025 · default by 2026",
    note: "A version-controlled spec, not the code, is the source of truth for agents.",
    source: { type: "Repo", cite: "GitHub Spec Kit (AWS Kiro is the second example)", url: "https://github.com/github/spec-kit" },
  },
  {
    name: "Demos and evals over docs — Cat Wu, Anthropic",
    ring: 3,
    date: 2026.21,
    status: "c",
    when: "Mar 2026 · Claude blog",
    note: "Prototype first: share working demos instead of writing long specs.",
    source: { type: "Article", cite: "Cat Wu, Claude blog: Product management on the AI exponential", url: "https://claude.com/blog/product-management-on-the-ai-exponential" },
  },
  {
    name: "The Product Builder role — LinkedIn, Forbes",
    ring: 3,
    date: 2026.58,
    status: "m",
    when: "Jul 2026",
    note: "PM, design and engineering blur into one role; APM tracks become builder tracks.",
    source: { type: "Article", cite: "The Linked Blog: LinkedIn replaces its APM program with a full-stack builder model", url: "https://thelinkedblog.com/2026/linkedin-replaces-its-apm-program-with-a-full-stack-builder-model-3828/" },
  },
  {
    name: "LLM patterns — Eugene Yan",
    ring: 4,
    date: 2023.55,
    status: "e",
    when: "2023",
    note: "Evals, retrieval, guardrails and feedback as the core building blocks.",
    source: { type: "Article", cite: "Eugene Yan, Patterns for Building LLM-based Systems & Products (2023)", url: "https://eugeneyan.com/writing/llm-patterns/" },
  },
  {
    name: "Error analysis first — Hamel Husain & Shreya Shankar",
    ring: 4,
    date: 2024.6,
    status: "e",
    when: "2024 · book due 31 Oct 2026",
    note: "Read real traces, name the failures, then write evals and validate LLM judges.",
    source: { type: "Book", cite: "Shreya Shankar & Hamel Husain, Evals for AI Engineers (due 31 Oct 2026)", url: "https://www.amazon.com/Evals-Engineers-Systematically-Measuring-Applications/dp/B0GTYQTYDP" },
  },
  {
    name: "Verifiability — Andrej Karpathy",
    ring: 4,
    date: 2026.33,
    status: "c",
    when: "Apr 2026 · Sequoia Ascent",
    note: "Software automates what you can specify; LLMs automate what you can verify.",
    source: { type: "Talk", cite: "Andrej Karpathy, Sequoia AI Ascent 2026 (his own summary)", url: "https://karpathy.bearblog.dev/sequoia-ascent-2026/" },
  },
  {
    name: "/goal primitives — Claude Code, Codex",
    ring: 4,
    date: 2026.5,
    status: "c",
    when: "2026",
    note: "Users set goals instead of prompts; the agent keeps working toward them.",
    source: { type: "Docs", cite: "Claude Code and Codex goal features", url: null },
  },
  {
    name: "Loop engineering — Peter Steinberger",
    ring: 4,
    date: 2026.62,
    status: "m",
    when: "Summer 2026",
    note: "Stop prompting agents. Design loops with success criteria they check themselves against.",
    source: { type: "Article", cite: "Addy Osmani, Loop Engineering, 7 Jun 2026 (credits Peter Steinberger)", url: "https://addyosmani.com/blog/loop-engineering/" },
  },
  {
    name: "Benchmark distrust — the Grok 4.7 launch",
    ring: 4,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "\"Believing benchmarks in September should be a crime.\" Evaluate on your own tasks.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 22 Sep 2026: Agent Wars!", url: "https://aidailybrief.ai/e/2026-09-22" },
  },
  {
    name: "Building Effective Agents — Erik Schluntz & Barry Zhang",
    ring: 5,
    date: 2024.97,
    status: "e",
    when: "Dec 2024 · Anthropic",
    note: "Start with simple workflows; add agentic loops only where the task needs them.",
    source: { type: "Article", cite: "Erik Schluntz & Barry Zhang, Anthropic Engineering, 19 Dec 2024", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  },
  {
    name: "12-Factor Agents — Dex Horthy",
    ring: 5,
    date: 2025.3,
    status: "c",
    when: "2025",
    note: "Own your prompts, your context window and your control flow.",
    source: { type: "Guide", cite: "Dex Horthy, 12-Factor Agents (HumanLayer)", url: "https://github.com/humanlayer/12-factor-agents" },
  },
  {
    name: "Software 3.0 and the autonomy slider — Andrej Karpathy",
    ring: 5,
    date: 2025.46,
    status: "e",
    when: "Jun 2025",
    note: "Let users dial autonomy up as reliability is proven.",
    source: { type: "Talk", cite: "Andrej Karpathy, Software Is Changing (Again), YC AI Startup School, Jun 2025 (Latent Space transcript)", url: "https://www.latent.space/p/s3" },
  },
  {
    name: "Mono threads via compaction — Codex team",
    ring: 5,
    date: 2026.3,
    status: "c",
    when: "Apr 2026",
    note: "Once long threads stop degrading, one thread can own a recurring job for weeks.",
    source: { type: "Article", cite: "Nick Baumann (Codex), My Codex threads are alive, Apr 2026", url: "https://x.com/nickbaumann_/article/2044847066728579493" },
  },
  {
    name: "Muse design patterns — Lance Hassan",
    ring: 5,
    date: 2026.7,
    status: "m",
    when: "Sep 2026",
    note: "Persistence, goal-building, smart defaults, progressive disclosure, proactivity.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 17 Sep 2026: Why Everyone Is Getting Excited About Personal AI Agents", url: "https://aidailybrief.ai/e/2026-09-17" },
  },
  {
    name: "One Claude: Chat, Cowork and Design merged — Anthropic",
    ring: 5,
    date: 2026.71,
    status: "m",
    when: "Sep 2026",
    note: "\"People aren’t sure which product to start with.\" The product decides where work goes.",
    source: { type: "Article", cite: "Anthropic, Claude Cowork and chat are now one Claude, 16 Sep 2026", url: "https://claude.com/blog/cowork-is-now-claude" },
  },
  {
    name: "Coordinator agents — Claude Projects, Cursor Projects",
    ring: 5,
    date: 2026.715,
    status: "m",
    when: "Sep 2026",
    note: "One persistent thread plans and delegates to sub-agents. Chat becomes fleet management.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 20 Sep 2026: 7 Ways How We Use AI Is Changing", url: "https://aidailybrief.ai/e/2026-09-20" },
  },
  {
    name: "Voice as the interface — GPT Live 1 API, Devin Voice",
    ring: 5,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "Full-duplex voice paired with agents that can actually act.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 11 Sep 2026: What to Use the Latest AI Tools For", url: "https://aidailybrief.ai/e/2026-09-11" },
  },
  {
    name: "AI Engineering — Chip Huyen",
    ring: 6,
    date: 2025.02,
    status: "e",
    when: "Jan 2025",
    note: "Cost, latency and quality trade-offs treated as system design.",
    source: { type: "Book", cite: "Chip Huyen, AI Engineering (O’Reilly)", url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/" },
  },
  {
    name: "Writing code vs. shipping code — Demirer, Musolff, Yang",
    ring: 6,
    date: 2026.45,
    status: "c",
    when: "2026 · NBER w35275",
    note: "Agents lift commits 240% but releases only 30%. The bottleneck is elsewhere.",
    source: { type: "Paper", cite: "Mert Demirer, Leon Musolff & Liyuan Yang, NBER Working Paper 35275", url: "https://www.nber.org/papers/w35275" },
  },
  {
    name: "Model stacks and routing — practitioners",
    ring: 6,
    date: 2026.7,
    status: "m",
    when: "Sep 2026",
    note: "Don’t run every sub-agent on the frontier model. Match the model to the task.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 11 Sep 2026: What to Use the Latest AI Tools For", url: "https://aidailybrief.ai/e/2026-09-11" },
  },
  {
    name: "Good-enough models — SWE-2, DeepSeek V4.1 Flash",
    ring: 6,
    date: 2026.715,
    status: "m",
    when: "Sep 2026",
    note: "Near-frontier coding quality at a fraction of the cost.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 11 Sep 2026: What to Use the Latest AI Tools For", url: "https://aidailybrief.ai/e/2026-09-11" },
  },
  {
    name: "\"The era of subsidized tokens is ending\" — Matt Shumer",
    ring: 6,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "OpenAI paused new $200 Pro subscriptions for lack of compute.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 11 Sep 2026: What to Use the Latest AI Tools For", url: "https://aidailybrief.ai/e/2026-09-11" },
  },
  {
    name: "Aggregation theory — Ben Thompson",
    ring: 7,
    date: 2015.3,
    status: "e",
    when: "2015 · Stratechery",
    note: "Whoever owns the customer relationship aggregates the suppliers behind it.",
    source: { type: "Article", cite: "Ben Thompson, Stratechery: Aggregation Theory (2015)", url: "https://stratechery.com/aggregation-theory/" },
  },
  {
    name: "Agent-native infrastructure — Andrej Karpathy",
    ring: 7,
    date: 2026.33,
    status: "c",
    when: "Apr 2026",
    note: "APIs, CLIs, schemas and structured logs built for agents, not just human UIs.",
    source: { type: "Talk", cite: "Andrej Karpathy, Sequoia AI Ascent 2026 (his own summary)", url: "https://karpathy.bearblog.dev/sequoia-ascent-2026/" },
  },
  {
    name: "Computer use unlocks consumer agents — Olivia & Justine Moore",
    ring: 7,
    date: 2026.63,
    status: "m",
    when: "Aug 2026 · a16z",
    note: "Agents can act without a hand-built API to every service.",
    source: { type: "Article", cite: "Olivia & Justine Moore, a16z, Aug 2026", url: null },
  },
  {
    name: "Multiplayer AI — Mollick, Bhatnagar, Bhani",
    ring: 7,
    date: 2026.7,
    status: "m",
    when: "Sep 2026",
    note: "Shared agents for teams. Who is the principal? Shared memory or shared context?",
    source: { type: "Podcast", cite: "The AI Daily Brief, 7 Sep 2026: The Multiplayer AI Sprint", url: "https://aidailybrief.ai/e/2026-09-07" },
  },
  {
    name: "Amazon blocks Muse, Shopify partners — the agent wars",
    ring: 7,
    date: 2026.715,
    status: "m",
    when: "Sep 2026",
    note: "Platforms choose: block agents, charge them, or open a clean API.",
    source: { type: "Article", cite: "GeekWire: Amazon blocks Meta’s Muse AI assistant", url: "https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/" },
  },
  {
    name: "\"Everything becomes B2A\" — Nicholas Bamonte",
    ring: 7,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "Businesses will sell to people’s agents, not only to people.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 22 Sep 2026: Agent Wars!", url: "https://aidailybrief.ai/e/2026-09-22" },
  },
  {
    name: "The Bitter Lesson — Rich Sutton",
    ring: 8,
    date: 2019.2,
    status: "e",
    when: "2019",
    note: "General methods that scale with compute beat hand-built cleverness.",
    source: { type: "Essay", cite: "Rich Sutton, The Bitter Lesson, 13 Mar 2019", url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html" },
  },
  {
    name: "Compound engineering — Dan Shipper & Kieran Klaassen",
    ring: 8,
    date: 2025.85,
    status: "c",
    when: "2025 · Every",
    note: "Plan, work, review, compound: each feature should make the next one easier.",
    source: { type: "Article", cite: "Dan Shipper & Kieran Klaassen, Every: Compound Engineering", url: "https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents" },
  },
  {
    name: "Revisit features with every model — Cat Wu",
    ring: 8,
    date: 2026.22,
    status: "c",
    when: "Mar 2026",
    note: "Build before the model is ready; re-test old features on each release.",
    source: { type: "Article", cite: "Cat Wu, Claude blog: Product management on the AI exponential", url: "https://claude.com/blog/product-management-on-the-ai-exponential" },
  },
  {
    name: "Pacing the frontier and compute limits",
    ring: 8,
    date: 2026.72,
    status: "m",
    when: "Sep 2026",
    note: "The next model may arrive later or cost more. Hedge the \"wait for the model\" bet.",
    source: { type: "Podcast", cite: "The AI Daily Brief, 15 Sep 2026: Trump Rails Against AI Slowdown “Hoax”", url: "https://aidailybrief.ai/e/2026-09-15" },
  },
];
