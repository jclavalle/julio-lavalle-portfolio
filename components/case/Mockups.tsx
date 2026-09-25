/**
 * Native, schematic illustrations of the E2E and trial-monitoring workflows.
 * They are NOT screenshots: labels are generic ("Example journey") and no counts or results are shown.
 */
import type { ReactNode } from "react";

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-surface/40">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-widest text-paper/80">{title}</span>
        <span className="font-mono text-[10px] tracking-widest text-muted">ILLUSTRATIVE</span>
      </div>
      <div className="p-4 text-[13px] leading-snug text-paper/90">{children}</div>
    </div>
  );
}

type Tone = "ok" | "warn" | "bad" | "mute";
const TONE: Record<Tone, string> = {
  ok: "bg-accent",
  warn: "bg-warm",
  bad: "bg-[#C9776B]",
  mute: "bg-muted/60",
};

function Dot({ tone }: { tone: Tone }) {
  return <span aria-hidden="true" className={`inline-block h-2 w-2 shrink-0 rounded-full ${TONE[tone]}`} />;
}

function Row({ tone, children, tag }: { tone: Tone; children: ReactNode; tag?: string }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-rule/60 py-2 first:border-t-0">
      <Dot tone={tone} />
      <span className="flex-1">{children}</span>
      {tag && <span className="font-mono text-[10px] tracking-wider text-muted">{tag}</span>}
    </div>
  );
}

function Skeleton({ w }: { w: string }) {
  return <span aria-hidden="true" className={`inline-block h-2 rounded-full bg-rule ${w}`} />;
}

/* ---------- E2E pipeline ---------- */

function CiRun() {
  return (
    <Frame title="NIGHTLY CI RUN">
      <Row tone="ok" tag="STEP 1">Check out the repository</Row>
      <Row tone="ok" tag="STEP 2">Run Playwright tests</Row>
      <Row tone="ok" tag="STEP 3">Send results to the reporting dashboard</Row>
    </Frame>
  );
}

function Report() {
  const tiles: { l: string; t: Tone }[] = [
    { l: "Passed", t: "ok" },
    { l: "Flaky", t: "warn" },
    { l: "Failed", t: "bad" },
  ];
  return (
    <Frame title="TEST REPORT DASHBOARD">
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((x) => (
          <div key={x.l} className="rounded-lg border border-rule p-3">
            <div className="flex items-center gap-2">
              <Dot tone={x.t} />
              <span className="text-xs text-paper/90">{x.l}</span>
            </div>
            <div className="mt-3">
              <Skeleton w="w-10" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Each test keeps its history, retries, traces and error details.</p>
    </Frame>
  );
}

function ChatSummary() {
  return (
    <Frame title="NIGHTLY E2E SUMMARY · TEAM CHANNEL">
      <p className="mb-2 text-xs text-muted">Posted by the scheduled routine</p>
      <Row tone="ok" tag="PASSED">Example journeys that passed cleanly</Row>
      <Row tone="warn" tag="FLAKY">Failed once, passed on retry</Row>
      <Row tone="mute" tag="NOT RECOVERED">Still open for human review</Row>
      <Row tone="bad" tag="FAILED">Failed on every attempt · story linked</Row>
    </Frame>
  );
}

function Story() {
  return (
    <Frame title="ENGINEERING STORY · CREATED AUTOMATICALLY">
      <p className="font-display text-base text-paper">Example journey failing after 3 attempts</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
        <dt className="font-mono tracking-wider text-muted">OWNER</dt>
        <dd>Assigned to an engineer</dd>
        <dt className="font-mono tracking-wider text-muted">EVIDENCE</dt>
        <dd>Link to the failing test, error and trace</dd>
        <dt className="font-mono tracking-wider text-muted">REPRO</dt>
        <dd>Steps to reproduce the failure</dd>
        <dt className="font-mono tracking-wider text-muted">FIX</dt>
        <dd>Suggested pull request drafted with Claude</dd>
      </dl>
    </Frame>
  );
}

function Review() {
  return (
    <Frame title="HUMAN REVIEW">
      <Row tone="ok">Reproduce the failure and check the report</Row>
      <Row tone="ok">Engineer reviews the suggested fix</Row>
      <Row tone="ok">Fix keeps the intended assertion, not just a passing run</Row>
      <Row tone="ok">CI re-runs the test before merge</Row>
    </Frame>
  );
}

const PIPELINE: { k: string; t: string; d: string; m: ReactNode }[] = [
  { k: "01", t: "Playwright runs in CI", d: "Nightly and on-demand Playwright runs execute in GitHub and send their results onward.", m: <CiRun /> },
  { k: "02", t: "Results land in a dashboard", d: "TestDino collects each run, keeping retries, history and error details per test.", m: <Report /> },
  { k: "03", t: "A routine reads and summarizes", d: "A scheduled Claude routine pulls the results and posts a summary to Slack: passed, flaky, not recovered and failed.", m: <ChatSummary /> },
  { k: "04", t: "Stories are created for real failures", d: "Tests that keep failing across retries get a Shortcut story with the test link and reproduction steps, assigned to an engineer. Stories often arrive with a suggested fix as a pull request from Claude.", m: <Story /> },
  { k: "05", t: "A person stays in the loop", d: "Failed tests come first, then flaky ones. Someone reproduces the issue, an engineer reviews the suggested fix, and the test re-runs before it counts as fixed.", m: <Review /> },
];

export function E2EPipeline() {
  return (
    <ol className="mt-10 space-y-10">
      {PIPELINE.map((s) => (
        <li key={s.k} className="grid items-start gap-5 border-t border-rule pt-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">{s.k}</p>
            <h3 className="mt-2 font-display text-xl leading-tight text-paper">{s.t}</h3>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-paper/85 md:text-base">{s.d}</p>
          </div>
          {s.m}
        </li>
      ))}
    </ol>
  );
}
