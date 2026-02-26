import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Rss, ShieldCheck } from "lucide-react";

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
    const fetchVotes = async () => {
      const { count, error } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) setTotalVotes(count);
      setLoading(false);
    };
    fetchVotes();
  }, []);

  // Determine active milestone
  const activeMilestoneIndex = milestones.findIndex((m) => totalVotes < m.requiredVotes);
  const active = activeMilestoneIndex >= 0 ? milestones[activeMilestoneIndex] : milestones[milestones.length - 1];
  const nextMilestone = activeMilestoneIndex >= 0 && activeMilestoneIndex < milestones.length - 1 ? milestones[activeMilestoneIndex + 1] : null;

  const fillPercent = Math.min((totalVotes / active.requiredVotes) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-28 pb-6 px-6 text-center">
        <button onClick={() => navigate(-1)} className="absolute left-6 top-20 text-muted-foreground hover:text-foreground transition-colors text-sm">
          ‹
        </button>
        <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">
          The Vessel
        </h2>
      </section>

      {/* Active Target */}
      <section className="px-6 max-w-md mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-copper font-sans mb-2 text-center">
          Active Target
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1 text-center">
          {active.name}
        </h1>
        <div className="warm-divider my-4" />

        {/* Vessel & Rewards Grid */}
        <div className="grid grid-cols-[1fr_1fr] gap-4 items-start">
          {/* Copper Vessel */}
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-border bg-secondary/30">
            {/* Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
              style={{
                height: `${fillPercent}%`,
                background: `linear-gradient(to top, hsl(var(--copper)), hsl(var(--gold) / 0.6))`,
              }}
            />
            {/* Overlay glow */}
            <div
              className="absolute bottom-0 left-0 right-0 opacity-40"
              style={{
                height: `${Math.min(fillPercent + 10, 100)}%`,
                background: `radial-gradient(ellipse at bottom, hsl(var(--copper) / 0.5), transparent 70%)`,
              }}
            />
          </div>

          {/* Rewards */}
          <div className="space-y-4">
            {active.rewards.map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="shrink-0 w-8 h-8 rounded-md bg-copper/20 flex items-center justify-center text-copper">
                  {r.icon === "archive" ? <Rss className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{r.title}</p>
                  <p className="text-xs text-copper/80 italic leading-snug mt-0.5">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Evolution */}
        {nextMilestone && (
          <div className="mt-6 text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
              Next Evolution: {nextMilestone.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Required: {nextMilestone.requiredVotes.toLocaleString()} Avg Votes
            </p>
          </div>
        )}

        {/* Saturation Level */}
        <div className="mt-8 mb-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
            Saturation Level
          </p>
          <p className="text-2xl font-serif font-bold text-copper">
            {loading ? "—" : totalVotes} <span className="text-muted-foreground text-base font-sans font-normal">/ {active.requiredVotes} Votes</span>
          </p>
        </div>
      </section>

      {/* Bottom Message */}
      <section className="px-6 py-10 max-w-sm mx-auto text-center">
        <p className="text-xs text-copper/60 tracking-wide leading-relaxed uppercase">
          The vessel collects collective will. As the copper rises, the studio solidifies.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Vessel;
