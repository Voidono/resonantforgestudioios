import { useState } from "react";
import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Voluntary Support Only",
    body: "Participation is never coerced. No psychological traps for retention. Subscriptions are conscious choices and can be terminated instantly.",
  },
  {
    title: "Transparency Over Optimization",
    body: "Algorithms serve the user, not the engagement metrics. Studio logic is legible and auditable. Clarity is our primary product.",
  },
  {
    title: "Privacy as a Constraint",
    body: "Data handling is a physical constraint. We collect the minimum required. Your digital footprint is your property.",
  },
  {
    title: "Resonant Value Exchange",
    body: "Value is depth of resonance, not volume of consumption. Tools that offer lasting utility, respecting the finite nature of your focus.",
  },
  {
    title: "Human-Centric Agency",
    body: "The platform empowers human agency, not automates it away. Features built to support informed decisions.",
  },
];

const Principles = () => {
  const [active, setActive] = useState(0);

  return (
    <PageShell>
      <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[280px_1fr] gap-[var(--sp-gap)] py-[var(--sp-section)]">
        {/* Header / list */}
        <aside className="flex flex-col gap-3 min-h-0">
          <div>
            <p className="section-label">Structural Contract V1.0.4</p>
            <h1
              className="font-serif font-bold leading-tight mt-1"
              style={{ fontSize: "var(--fs-h1)" }}
            >
              Studio Principles
            </h1>
          </div>
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto min-h-0">
            {principles.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 md:shrink text-left px-3 py-2 rounded border transition-colors",
                  active === i
                    ? "border-copper bg-copper/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-copper/40",
                )}
              >
                <span className="principle-number block text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs tracking-wider uppercase font-medium">{p.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Detail */}
        <article className="relative border border-border rounded-lg bg-card/60 p-6 md:p-8 flex flex-col min-h-0 overflow-y-auto">
          <span className="principle-number mb-2">{String(active + 1).padStart(2, "0")}</span>
          <h2 className="principle-title mb-4" style={{ fontSize: "var(--fs-h2)" }}>
            {principles[active].title}
          </h2>
          <p className="text-foreground/80 leading-relaxed" style={{ fontSize: "var(--fs-body)" }}>
            {principles[active].body}
          </p>
          <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
            <button className="bg-copper text-background px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-copper/90 transition-colors rounded">
              Accept Principles
            </button>
            <button className="text-[11px] text-copper tracking-[0.15em] uppercase hover:underline">
              Download PDF
            </button>
          </div>
        </article>
      </div>
    </PageShell>
  );
};

export default Principles;
