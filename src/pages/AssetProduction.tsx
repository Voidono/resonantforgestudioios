import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Settings, ChevronDown, PlusSquare, FolderOpen, AtSign, BarChart3, Layers } from "lucide-react";
import { useState } from "react";

const milestones = [
  {
    num: "01",
    title: "DIRECTION CHECK",
    description: "Technical audit of source materials, style guides, and reference libraries to ensure absolute production alignment.",
    icon: Settings,
    active: true,
  },
  {
    num: "02",
    title: "BLOCKOUT PHASE",
    description: "Initial silhouette and scale validation in-engine. Verification of spatial accuracy before high-fidelity detailing.",
    icon: Settings,
    active: true,
  },
  {
    num: "03",
    title: "HIGH POLY MODEL",
    description: "Master geometry creation using Sub-D or Boolean workflows. Focus on surface tension and mechanical logic.",
    icon: Layers,
    active: false,
  },
  {
    num: "04",
    title: "RETOPOLOGY & UV",
    description: "Game-ready mesh optimization and layout for maximum texel density and efficient surfacing.",
    icon: BarChart3,
    active: false,
  },
];

const AssetProduction = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        {/* Back */}
        <button
          onClick={() => navigate("/transaction")}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans font-medium mb-10 hover:opacity-80 transition-opacity"
          style={{ color: "hsl(var(--copper))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Hero + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
          {/* Left - Hero */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg bg-card/40 p-8 md:p-10">
              {/* Tag */}
              <span
                className="inline-block text-[10px] tracking-[0.15em] uppercase font-sans font-semibold px-3 py-1.5 rounded mb-6 border"
                style={{
                  color: "hsl(var(--copper))",
                  borderColor: "hsl(var(--copper))",
                  backgroundColor: "hsl(var(--copper) / 0.1)",
                }}
              >
                STUDIO PIPELINE & APPROACH
              </span>

              <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide text-foreground mb-6 leading-tight">
                Selective Asset<br />Pipeline
              </h1>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                High-fidelity asset intake and pricing transparency system for elite studio production.
                Engineered to eliminate scope creep and optimize throughput.
              </p>

              {/* Quote */}
              <div className="border-l-2 pl-4 py-2" style={{ borderColor: "hsl(var(--copper))" }}>
                <p className="text-sm italic text-muted-foreground">
                  "Built to eliminate scope creep, unclear pricing, and late-stage rework."
                </p>
              </div>
            </div>
          </div>

          {/* Right - Magnitude & Fidelity */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <h2 className="text-lg md:text-xl font-serif font-bold tracking-wider text-foreground mb-1">
                MAGNITUDE & FIDELITY
              </h2>
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold mb-5"
                style={{ color: "hsl(var(--copper))" }}
              >
                THE PRICING FRAMEWORK
              </p>
            </div>

            {/* Scope Card */}
            <div className="border border-border rounded-lg bg-card/40 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
                >
                  <BarChart3 className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
                </div>
                <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">SCOPE</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Precise evaluation of physical volume, asset counts, and scene density. We quantify the scale of production to ensure realistic and locked timelines.
              </p>
            </div>

            {/* Complexity Card */}
            <div className="border border-border rounded-lg bg-card/40 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
                >
                  <Settings className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
                </div>
                <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">COMPLEXITY</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mapping technical difficulty, mechanical logic, and specialized shader requirements. High-fidelity systems demand surgical engineering.
              </p>
            </div>

            {/* Quote */}
            <div className="border border-border rounded-lg bg-secondary/30 p-5 text-center">
              <p className="text-xs italic text-muted-foreground leading-relaxed">
                "Every quote is mapped against these variables to ensure industrial-grade predictability."
              </p>
            </div>
          </div>
        </div>

        {/* The Forge Pipeline + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Pipeline */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-foreground">
                THE FORGE PIPELINE
              </h2>
              <span className="text-[10px] tracking-[0.1em] font-sans font-medium text-muted-foreground border border-border rounded px-2.5 py-1">
                V2.4.0
              </span>
            </div>
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold mb-8"
              style={{ color: "hsl(var(--copper))" }}
            >
              13 CORE MILESTONES
            </p>

            {/* Milestones */}
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.num} className="flex gap-4 py-5 border-t border-border">
                  {/* Number */}
                  <div
                    className="w-10 h-10 rounded border flex items-center justify-center shrink-0 text-sm font-serif font-bold"
                    style={{
                      borderColor: m.active ? "hsl(var(--copper))" : "hsl(var(--border))",
                      color: m.active ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {m.num}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">
                        {m.title}
                      </h3>
                      <m.icon
                        className="w-4 h-4"
                        style={{ color: m.active ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View full pipeline */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full mt-2 py-3 border border-border rounded text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground hover:text-foreground hover:border-copper/40 transition-colors flex items-center justify-center gap-2"
            >
              VIEW FULL PIPELINE BREAKDOWN
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Right - CTA + Actions */}
          <div className="lg:col-span-2 flex flex-col justify-end gap-6">
            {/* CTA Button */}
            <button
              onClick={() => navigate("/asset-classification")}
              className="w-full py-5 rounded-lg text-sm md:text-base tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
            >
              BEGIN ASSET INTAKE
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Custom scope link */}
            <div className="border border-border rounded-lg bg-card/40 p-4 text-center">
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-1">
                LOOKING FOR CUSTOM SCOPE OR NON-PIPELINE USAGE?
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="text-[10px] tracking-[0.12em] uppercase font-sans font-bold flex items-center justify-center gap-2 mx-auto hover:opacity-80 transition-opacity"
                style={{ color: "hsl(var(--copper))" }}
              >
                CONTACT STUDIO FOR SPECIALIZED ENGAGEMENT
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action icons */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: PlusSquare, label: "NEW INTAKE" },
                { icon: FolderOpen, label: "ACTIVE ASSETS" },
                { icon: AtSign, label: "SUPPORT" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 py-4 rounded-lg border border-border bg-card/40 hover:border-copper/30 transition-colors"
                >
                  <action.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssetProduction;
