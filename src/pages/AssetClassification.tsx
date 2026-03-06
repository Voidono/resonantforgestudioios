import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useState } from "react";

const scopeDefinitions = [
  { tier: "T1", title: "SINGLE COMPONENT", desc: "Single small prop/element." },
  { tier: "T2", title: "INTEGRATED ASSET", desc: "Complete meaningful asset." },
  { tier: "T3", title: "SUB-SYSTEM", desc: "Large asset or small batch." },
  { tier: "T4", title: "MACRO UNIT", desc: "Multi-asset set/kit." },
  { tier: "T5", title: "OMNI ENVIRONMENT", desc: "Production run/large batch." },
];

const complexityDefinitions = [
  { tier: "T1", title: "ROUTINE", desc: "Routine/Well-understood task." },
  { tier: "T2", title: "STANDARD", desc: "Mild problem-solving required." },
  { tier: "T3", title: "TECHNICAL", desc: "Moderate technical/aesthetic challenge." },
  { tier: "T4", title: "ADVANCED", desc: "Advanced/specialist fidelity." },
  { tier: "T5", title: "EXPERIMENTAL", desc: "Cutting-edge/high-risk novel systems." },
];

const rateMap: Record<string, { rate: number; hours: number }> = {
  "1,1": { rate: 30, hours: 0.5 },
  "1,2": { rate: 35, hours: 1 },
  "1,3": { rate: 40, hours: 1.5 },
  "1,4": { rate: 50, hours: 2 },
  "1,5": { rate: 60, hours: 3 },
  "2,1": { rate: 35, hours: 1 },
  "2,2": { rate: 40, hours: 2 },
  "2,3": { rate: 50, hours: 3 },
  "2,4": { rate: 60, hours: 5 },
  "2,5": { rate: 75, hours: 8 },
  "3,1": { rate: 40, hours: 2 },
  "3,2": { rate: 50, hours: 4 },
  "3,3": { rate: 60, hours: 6 },
  "3,4": { rate: 75, hours: 10 },
  "3,5": { rate: 90, hours: 16 },
  "4,1": { rate: 50, hours: 4 },
  "4,2": { rate: 60, hours: 8 },
  "4,3": { rate: 75, hours: 12 },
  "4,4": { rate: 90, hours: 20 },
  "4,5": { rate: 110, hours: 32 },
  "5,1": { rate: 60, hours: 8 },
  "5,2": { rate: 75, hours: 16 },
  "5,3": { rate: 90, hours: 24 },
  "5,4": { rate: 110, hours: 40 },
  "5,5": { rate: 130, hours: 60 },
};

const AssetClassification = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<{ scope: number; complexity: number } | null>(null);

  const currentRate = selected ? rateMap[`${selected.scope},${selected.complexity}`] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      {/* Sub-nav */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center gap-8 py-3">
          <span
            className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold border-b-2 pb-1"
            style={{ color: "hsl(var(--copper))", borderColor: "hsl(var(--copper))" }}
          >
            CORE MATRIX MAPPING
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground">
            PHASE 01: ANALYSIS
          </span>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Back */}
        <button
          onClick={() => navigate("/asset-production")}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans font-medium mb-8 hover:opacity-80 transition-opacity"
          style={{ color: "hsl(var(--copper))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Title */}
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-1">
          RESONANT FORGE STUDIOS
        </p>
        <h1 className="text-2xl md:text-4xl font-serif font-bold italic tracking-wide text-foreground mb-10">
          INTAKE: ASSET CLASSIFICATION HUB
        </h1>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Definitions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Scope */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground mb-4">
                SCOPE DEFINITIONS
              </h2>
              <div className="space-y-3">
                {scopeDefinitions.map((s) => (
                  <div key={s.tier} className="flex gap-3">
                    <span
                      className="text-xs font-sans font-bold shrink-0"
                      style={{ color: "hsl(var(--copper))" }}
                    >
                      {s.tier}
                    </span>
                    <div>
                      <p className="text-xs font-sans font-bold text-foreground">{s.title}</p>
                      <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground mb-4">
                COMPLEXITY DEFINITIONS
              </h2>
              <div className="space-y-3">
                {complexityDefinitions.map((c) => (
                  <div key={c.tier} className="flex gap-3">
                    <span
                      className="text-xs font-sans font-bold shrink-0"
                      style={{ color: "hsl(var(--copper))" }}
                    >
                      {c.tier}
                    </span>
                    <div>
                      <p className="text-xs font-sans font-bold text-foreground">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Grid */}
          <div className="lg:col-span-5">
            <div className="text-center mb-6">
              <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground leading-relaxed">
                SELECT A GRID COORDINATE TO DEFINE THE EXPECTED PRODUCTION SCOPE AND
                TECHNICAL COMPLEXITY FOR YOUR ASSET.
              </p>
              <p className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-2">
                ACCURACY IS <span className="font-bold text-foreground underline">NOT</span> MANDATORY. THIS DATA IS UTILIZED TO GENERATE A REFINED ESTIMATION BASELINE AND DOES NOT REQUIRE ABSOLUTE TECHNICAL PRECISION.
              </p>
            </div>

            {/* 5x5 Grid */}
            <div className="relative">
              {/* Y-axis label */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90">
                <span className="text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-muted-foreground">
                  COMPLEXITY
                </span>
              </div>

              <div className="ml-6">
                {/* Y-axis numbers */}
                <div className="grid grid-rows-5 gap-0">
                  {[5, 4, 3, 2, 1].map((row) => (
                    <div key={row} className="flex items-center">
                      <span
                        className="w-6 text-xs font-sans font-bold text-right mr-2"
                        style={{ color: row === (selected?.complexity ?? 0) ? "hsl(var(--copper))" : undefined }}
                      >
                        {row}
                      </span>
                      <div className="flex-1 grid grid-cols-5 gap-0">
                        {[1, 2, 3, 4, 5].map((col) => {
                          const isSelected = selected?.scope === col && selected?.complexity === row;
                          return (
                            <button
                              key={col}
                              onClick={() => setSelected({ scope: col, complexity: row })}
                              className={`aspect-square border border-border transition-all hover:border-copper/50 relative ${
                                isSelected ? "bg-copper/90" : "bg-card/20 hover:bg-card/40"
                              }`}
                            >
                              {isSelected && (
                                <span className="text-xs font-sans font-bold text-background">
                                  {col}.{row}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* X-axis numbers */}
                <div className="flex ml-8">
                  {[1, 2, 3, 4, 5].map((col) => (
                    <div key={col} className="flex-1 text-center">
                      <span
                        className="text-xs font-sans font-bold"
                        style={{ color: col === (selected?.scope ?? 0) ? "hsl(var(--copper))" : undefined }}
                      >
                        {col}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-muted-foreground mt-1 ml-8">
                  SCOPE
                </p>
              </div>
            </div>
          </div>

          {/* Right - Reference & Pricing */}
          <div className="lg:col-span-4 space-y-5">
            {/* Reference Image placeholder */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div
                className="px-3 py-1.5 text-[9px] tracking-[0.1em] uppercase font-sans font-bold"
                style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
              >
                REFERENCE EXAMPLE: FIDELITY {selected ? `${selected.scope}.${selected.complexity}` : "—"}
              </div>
              <div className="aspect-[4/3] bg-card/60 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 rounded border border-border flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                      {selected ? `${selected.scope}.${selected.complexity}` : "?"}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans">REFERENCE PREVIEW</p>
                </div>
              </div>
            </div>

            {/* Asset Info */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h3 className="text-sm font-serif font-bold tracking-wider text-foreground mb-1">
                ASSET: {selected ? "CLASSIFICATION" : "AWAITING SELECTION"}
              </h3>
              {selected && (
                <>
                  <p className="text-[10px] font-sans mb-4" style={{ color: "hsl(var(--copper))" }}>
                    ● FIDELITY LEVEL {selected.scope}.{selected.complexity} VERIFIED
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border border-border rounded p-3 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">
                        ${currentRate?.rate}/HR
                      </p>
                      <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                        BASE RATE
                      </p>
                    </div>
                    <div className="border border-border rounded p-3 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">
                        {currentRate?.hours}H
                      </p>
                      <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                        EST. BUILD
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mb-5" style={{ color: "hsl(var(--copper))" }}>
                    This is a directive estimation used to generate a more accurate scope and cost breakdown based on your project requirements. Final pricing is verified post-submission.
                  </p>
                </>
              )}

              {!selected && (
                <p className="text-[10px] text-muted-foreground leading-relaxed my-4">
                  Select a coordinate on the grid to view pricing and estimation data.
                </p>
              )}

              {/* Confirm */}
              <button
                onClick={() => selected && navigate("/asset-intake")}
                disabled={!selected}
                className="w-full py-4 rounded-lg text-sm tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity disabled:opacity-40"
                style={{
                  backgroundColor: "hsl(var(--copper))",
                  color: "hsl(var(--background))",
                }}
              >
                CONFIRM
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Auth notice */}
            <div className="flex items-start gap-2 px-3">
              <Lock className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "hsl(var(--copper))" }} />
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground leading-relaxed">
                NOTICE: AUTHENTICATION REQUIRED. STUDIO LOGIN IS MANDATORY FOR ALL SUBSEQUENT STAGES BEYOND THIS INTERFACE.
              </p>
            </div>
          </div>
        </div>

        {/* Selected coordinates */}
        {selected && (
          <div className="mt-8 text-right">
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground">
              ● SELECTED COORDINATES:{" "}
              <span style={{ color: "hsl(var(--copper))" }}>
                ({selected.scope}, {selected.complexity})
              </span>
            </span>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AssetClassification;
