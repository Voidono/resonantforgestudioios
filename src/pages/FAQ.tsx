import { useState } from "react";
import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What do I get for subscribing?",
    a: "Full access to project archives, early releases of all creative assets, a seat in quarterly strategy workshops, and a dedicated digital badge.",
  },
  {
    q: "Where does the money go?",
    a: "60% to artists and developers under contract. 20% to infrastructure and software. 20% to a community fund for independent grants.",
  },
  {
    q: "How can I get involved?",
    a: "Join our Discord, contribute to open-source branches, and vote in weekly feedback sessions on the studio's next creative direction.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "No. Cancel any time with one click. No partial-month refunds; access remains active until the end of your current billing period.",
  },
  {
    q: "What happens to my data?",
    a: "Only what's essential for payments and access. Never sold. Email is used strictly for account notifications and our newsletter.",
  },
  {
    q: "Can I upgrade my tier later?",
    a: "Yes — upgrade or downgrade any time. Changes are prorated for the remainder of your billing cycle.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(0);

  return (
    <PageShell>
      <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[320px_1fr] gap-[var(--sp-gap)] py-[var(--sp-section)]">
        <aside className="flex flex-col gap-3 min-h-0">
          <div>
            <p className="section-label">Direct Answers</p>
            <h1 className="font-serif font-bold leading-tight mt-1" style={{ fontSize: "var(--fs-h1)" }}>
              Frequently Asked
              <span className="italic"> Questions</span>
            </h1>
          </div>
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto min-h-0">
            {faqs.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 md:shrink text-left px-3 py-2 rounded border transition-colors text-xs",
                  active === i
                    ? "border-copper bg-copper/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-copper/40",
                )}
              >
                {f.q}
              </button>
            ))}
          </div>
        </aside>

        <article className="border border-border rounded-lg bg-card/60 p-6 md:p-8 flex flex-col min-h-0 overflow-y-auto">
          <h2 className="faq-question mb-4" style={{ fontSize: "var(--fs-h2)" }}>
            {faqs[active].q}
          </h2>
          <p className="text-foreground/80 leading-relaxed" style={{ fontSize: "var(--fs-body)" }}>
            {faqs[active].a}
          </p>
          <div className="mt-auto pt-6 border-t border-border">
            <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--fs-small)" }}>
              Still have questions?
            </p>
            <button className="text-copper text-xs font-medium hover:underline">
              Contact Support →
            </button>
          </div>
        </article>
      </div>
    </PageShell>
  );
};

export default FAQ;
