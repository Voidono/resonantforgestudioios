import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroGradient from "@/assets/hero-gradient.jpg";
import studioLogo from "@/assets/studio-logo.png";
import PageShell from "@/components/PageShell";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "intro", label: "Intro" },
  { id: "is", label: "What This Is" },
  { id: "isnt", label: "What This Is Not" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const notList = [
  "A traditional game publisher.",
  "A platform that exploits FOMO or scarcity.",
  "An aggressive retention-first algorithm.",
  "Virtual loot boxes or predatory monetization.",
  "No opaque virtual currencies.",
];

const Index = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("intro");

  return (
    <PageShell contained={false}>
      <div
        className="flex-1 min-h-0 flex flex-col"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--background)/0.5), hsl(var(--background)/0.85)), url(${heroGradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1 min-h-0 mx-auto max-w-3xl w-full px-4 md:px-8 flex flex-col items-center justify-center gap-[var(--sp-gap)] text-center">
          {tab === "intro" && (
            <>
              <img src={studioLogo} alt="Resonant Forge Studios" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              <h1
                className="font-serif font-bold tracking-wide leading-tight text-foreground"
                style={{ fontSize: "var(--fs-display)" }}
              >
                RESONANT<br />FORGE STUDIOS
              </h1>
              <p
                className="font-serif italic text-muted-foreground max-w-md"
                style={{ fontSize: "var(--fs-body)" }}
              >
                A studio exploring games and systems without coercive monetization.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                <button
                  onClick={() => navigate("/transaction")}
                  className="flex-1 border-2 border-foreground/40 text-foreground px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-foreground/10 transition-colors"
                >
                  Subscribe
                </button>
                <button
                  onClick={() => setTab("is")}
                  className="flex-1 bg-foreground/20 text-foreground px-6 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-foreground/30 transition-colors backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
            </>
          )}

          {tab === "is" && (
            <div className="max-w-2xl">
              <p className="section-label mb-4">What This Is</p>
              <p
                className="text-foreground/90 leading-relaxed"
                style={{ fontSize: "var(--fs-body)" }}
              >
                Resonant Forge Studios is an independent research and development lab dedicated to the
                craft of game systems. We believe games should be judged by depth of engagement and
                quality of loops — not by their ability to exploit psychological vulnerabilities. Our
                work focuses on sustainable participation models that respect the player's time and agency.
              </p>
            </div>
          )}

          {tab === "isnt" && (
            <div className="max-w-2xl w-full">
              <p className="section-label mb-4">What This Is Not</p>
              <div className="space-y-2">
                {notList.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start py-2 px-3 bg-secondary/50 rounded-md text-left"
                  >
                    <span className="principle-number">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-foreground/80" style={{ fontSize: "var(--fs-small)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <nav className="border-t border-border bg-background/70 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl flex items-center justify-center gap-1 p-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-3 md:px-4 py-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase rounded transition-colors",
                  tab === t.id
                    ? "bg-copper text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </PageShell>
  );
};

export default Index;
