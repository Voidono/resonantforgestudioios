import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageShell from "@/components/PageShell";
import { Rss, ShieldCheck, ArrowLeft } from "lucide-react";

interface MilestoneReward {
  icon: "archive" | "ip";
  title: string;
  description: string;
}

interface Milestone {
  name: string;
  requiredVotes: number;
  rewards: MilestoneReward[];
}

const milestones: Milestone[] = [
  {
    name: "Milestone I",
    requiredVotes: 250,
    rewards: [
      { icon: "archive", title: "Full Vote Archives", description: "Historical integrity for all future decisions." },
      { icon: "ip", title: "First IP Locked", description: "Ownership structures solidified in the forge." },
    ],
  },
  {
    name: "Milestone II",
    requiredVotes: 1000,
    rewards: [
      { icon: "archive", title: "Community Governance", description: "Voting power expands to studio direction." },
      { icon: "ip", title: "Revenue Sharing", description: "Supporters earn a stake in studio output." },
    ],
  },
];

const Vessel = () => {
  const navigate = useNavigate();
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("votes")
      .select("*", { count: "exact", head: true })
      .then(({ count, error }) => {
        if (!error && count !== null) setTotalVotes(count);
        setLoading(false);
      });
  }, []);

  const activeIndex = milestones.findIndex((m) => totalVotes < m.requiredVotes);
  const active = activeIndex >= 0 ? milestones[activeIndex] : milestones[milestones.length - 1];
  const next = activeIndex >= 0 && activeIndex < milestones.length - 1 ? milestones[activeIndex + 1] : null;
  const fillPercent = Math.min((totalVotes / active.requiredVotes) * 100, 100);

  return (
    <PageShell>
      <div className="flex-1 min-h-0 flex flex-col py-[var(--sp-section)] gap-[var(--sp-gap)]">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <p className="section-label">The Vessel</p>
          <div className="w-12" />
        </header>

        {/* Main grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[minmax(180px,260px)_1fr] gap-[var(--sp-gap)] items-stretch">
          {/* Vessel */}
          <div className="relative w-full max-w-[260px] mx-auto aspect-[3/4] rounded-lg overflow-hidden border border-border bg-secondary/30">
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
              style={{
                height: `${fillPercent}%`,
                background: `linear-gradient(to top, hsl(var(--copper)), hsl(var(--gold) / 0.6))`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 opacity-40 pointer-events-none"
              style={{
                height: `${Math.min(fillPercent + 10, 100)}%`,
                background: `radial-gradient(ellipse at bottom, hsl(var(--copper) / 0.5), transparent 70%)`,
              }}
            />
            <div className="absolute top-2 left-0 right-0 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-copper">Active Target</p>
              <p className="font-serif font-bold text-foreground" style={{ fontSize: "var(--fs-h2)" }}>
                {active.name}
              </p>
            </div>
          </div>

          {/* Rewards + meter */}
          <div className="flex flex-col gap-3 min-h-0">
            <div>
              <p className="section-label mb-1">Saturation Level</p>
              <p className="font-serif font-bold text-copper" style={{ fontSize: "var(--fs-h1)" }}>
                {loading ? "—" : totalVotes}
                <span className="text-muted-foreground text-sm font-sans font-normal">
                  {" "}/ {active.requiredVotes} Votes
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {active.rewards.map((r, i) => (
                <div key={i} className="flex gap-3 items-start border border-border rounded-md p-3 bg-card/40">
                  <div className="shrink-0 w-8 h-8 rounded-md bg-copper/20 flex items-center justify-center text-copper">
                    {r.icon === "archive" ? <Rss className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{r.title}</p>
                    <p className="text-[11px] text-copper/80 italic leading-snug mt-0.5">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {next && (
              <div className="mt-auto border-t border-border pt-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Next Evolution: {next.name} — {next.requiredVotes.toLocaleString()} votes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default Vessel;
